package org.aevans.simplrtek.jdbc;

import org.aevans.simplrtek.standards.FieldObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class handles all calls to  the database.
 * It simply provides access to the database with only the exception
 * that it will check if an IP address is in use by the domain.
 * 
 * Requires a jdbctempalte and a table.
 * 
 * Methods include:
 *      -dropProxy(ip,domain)
 *      -dropAllProxies(domain)
 *      -addProxy(ip,domain)
 *      -getIps(domain)
 *      -checkProxy(ip,domain)
 *      -truncate()
 * 
 * Access to the methods requires ownership of an instantiated class.
 * 
 * @author Andrew Evans
 * Copyright 2016
 * License : Free BSD
 *
 */
public class DatabaseHandler {
	
	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate template;
	
	private String statsTable;
	
	private String table;

	private String keyTable;
	
	private String indexTable;

	public String getKeyTable(){
		return this.keyTable;
	}

	@Required
	public void setKeyTable(String keyTable){
		this.keyTable = keyTable;
	}

	public String getIndexTable(){
		return this.indexTable;
	}

	public void setIndexTable(String indexTable){
		this.indexTable = indexTable;
	}
	
	public String getTable() {
		return table;
	}
	
	
	@Required
	public void setTable(String table) {
		this.table = table;
	}

	//called after instantiation to setup databases.
	public void initDbs(){
		String[] tableArr = table.split("\\.");
		if(tableArr.length > 1){
			this.template.execute(String.format("CREATE SCHEMA IF NOT EXISTS %s",tableArr[0]));
		}

		this.template.execute(String.format("CREATE TABLE IF NOT EXISTS %s (tablename varchar(256), field varchar(256), type varchar(256), standard varchar(512), description text)",this.table));
		this.template.execute(String.format("CREATE TABLE IF NOT EXISTS %s (field varchar(256),foreign_table varchar(256),description text)",this.keyTable));		
		this.template.execute(String.format("CREATE TABLE IF NOT EXISTS %s (name varchar(256),tables varchar(1024),keys varchar(1024))",this.indexTable));		
	}

	
	/**
	 * Take in the list of configured ip addresses and submit them
	 * to the database.
	 * @param iplist
	 * @return
	 */
	public boolean submitFields(List<FieldObject> fields){
		boolean posted = false;
		
		//insert the proxies into the database
		if(fields != null && fields.size() > 0){
			List<Object[]> dbobjs = new ArrayList<Object[]>();
			fields.stream().forEach(field -> dbobjs.add(new Object[]{field.table,field.fields,field.type,field.standard,field.description}));
					
			this.template.batchUpdate(String.format("INSERT INTO %s (tablename,field,type,standard,description) VALUES(?,?,?,?,?)",this.table), dbobjs);
			posted = true;
		}
		return posted;
	}
	
	
	/**
	 * Get all inactive proxies for a domain.
	 * @return  A Map<String,List<String>> of inactive proxies and their distribution over time (t(0) is from last truncate).
	 */
	public List<FieldObject> getFields(String like, String field){
		String ufield = field.trim().toLowerCase();
		List<FieldObject> rfields = null;
		String query = String.format("SELECT tablename,field,type,standard,description FROM %s WHERE %s ILIKE '%s'",table,ufield,like);
		rfields = this.template.query(query,this.fieldExtractor());
		return rfields;
	}
	
	private ResultSetExtractor<List<FieldObject>> fieldExtractor() {
		// create the array list of json strings for the query
		return (new ResultSetExtractor<List<FieldObject>>() {

			@Override
			public List<FieldObject> extractData(ResultSet rs) throws SQLException, DataAccessException {
				List<FieldObject> results = new ArrayList<FieldObject>();
				int ct = rs.getMetaData().getColumnCount();
				String[] names = new String[ct];
				for(int i =1 ; i <= ct; i++){
					names[i -1] = rs.getMetaData().getColumnName(i);
				}

				while(rs.next()){
					Map<String,String> mp = new HashMap<String,String>();
					for(int i = 1; i <= ct;i++){
						if(!names[i - 1].equals("tablename")){
							mp.put(names[i - 1],rs.getString(i));
						}else{
							mp.put("table",rs.getString(i));
						}
					}
					FieldObject fo = new FieldObject();
					fo.table = mp.get("table");
					fo.fields= mp.get("field");
					fo.standard =mp.get("standard");
					fo.type = mp.get("type");
					fo.description = mp.get("description");
					results.add(fo);
				}
				return results;
			}

		});
	}
	
	
	/**
	 * Truncate a specific table with CASCADE
	 * @param	 table		Truncates the ip table.
	 */
	public void truncate(String table){
		template.execute(String.format("TRUNCATE TABLE %s CASCADE",table));
	}
}
