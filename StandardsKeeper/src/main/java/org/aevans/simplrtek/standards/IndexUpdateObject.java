package org.aevans.simplrtek.standards;

import java.util.Map;

public class IndexUpdateObject{
	public String name;
	public String tables;
	public String keys;
	public Map<String,String> newkvs;

	public IndexUpdateObject(){

	}


	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setTables(String tables){
		this.tables = tables;
	}

	public String getTables(){
		return this.tables;
	}

	public void setKeys(String keys){
		this.keys = keys;
	}

	public String getKeys(){
		return this.keys;
	}

	public void setNewkvs(Map<String,String> newkvs){
		this.newkvs = newkvs;
	}

	public  Map<String,String> getNewkvs(){
		return this.newkvs;
	}
}