package org.aevans.simplrtek.standards;


public class IndexObject{
	public String name;
	public String tables;
	public String keys;

	public IndexObject(){

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
}