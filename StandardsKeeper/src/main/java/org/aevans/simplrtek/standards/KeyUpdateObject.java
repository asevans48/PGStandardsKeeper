package org.aevans.simplrtek.standards;

import java.util.Map;


public class KeyUpdateObject{
	public String table;
	public String field;
	public String foreign_table;
	public String description;
	public Map<String,String> newkvs;

	public KeyUpdateObject(){

	}

	public void setTable(String table){
		this.table = table;
	}

	public String getTable(){
		return this.table;
	}

	public void setField(String field){
		this.field = field;
	}

	public String getField(){
		return this.field;
	}

	public void setForeign_table(String foreign_table){
		this.foreign_table = foreign_table;
	}

	public void setDescription(String description){
		this.description = description;
	}

	public String getDescription(){
		return this.description;
	}

	public void setNewkvs(Map<String,String> newkvs){
		this.newkvs = newkvs;
	}

	public  Map<String,String> getNewkvs(){
		return this.newkvs;
	}
}