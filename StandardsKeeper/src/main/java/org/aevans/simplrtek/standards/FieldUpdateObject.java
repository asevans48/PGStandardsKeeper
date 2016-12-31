package org.aevans.simplrtek.standards;

import java.util.Map;

public class FieldUpdateObject{
	public String table;
	public String fields;
	public String type;
	public String standard;
	public String description;
	public Map<String,String> newkvs;

	public FieldUpdateObject(){

	}

	public String getTable(){
		return table;
	}

	public void setTable(String table){
		this.table = table;
	}	

	public String getFields(){
		return fields;
	}

	public void setFields(String fields){
		this.fields = fields;
	}

	public String getType(){
		return type;
	}

	public void setType(String type){
		this.type = type;
	}

	public String getStandard(){
		return standard;
	}

	public void setStandard(String standard){
		this.standard = standard;
	}

	public String getDescription(){
		return description;
	}

	public void setDescription(String description){
		this.description = description;
	}

	public void setNewkvs(Map<String,String> newkvs){
		this.newkvs = newkvs;
	}

	public  Map<String,String> getNewkvs(){
		return this.newkvs;
	}

}