package org.aevans.simplrtek.standards;



public class KeyObject{
	public String table;
	public String field;
	public String foreign_table;
	public String description;

	public KeyObject(){

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

}