package org.aevans.simplrtek.standards;

import org.aevans.simplrtek.standards.FieldObjectWrapper;
import org.aevans.simplrtek.standards.FieldObject;
import org.aevans.simplrtek.jdbc.DatabaseHandler;

import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.w3c.tidy.Tidy;

import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.HttpStatus;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.w3c.dom.Document;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerConfigurationException;
import java.io.StringWriter;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.io.File;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.Charset;

/**
 * The Initial entry point to the program. Uses a localhost to entertain calls for a proxy
 * and handles the incoming json to determine which ip address to send.
 * 
 * @author Andrew Evans
 * Copyright 2016
 * License : Free BSD
 *
 */
@ComponentScan(basePackages = { "org.aevans.simplrtek.standards","org.aevans.simplrtek.jdbc" }, includeFilters = @ComponentScan.Filter(value = Component.class, type = FilterType.ANNOTATION))
@RestController
@SpringBootApplication
public class StandardsAppClient {
	@Autowired
	private DatabaseHandler handler;




	public String getHomepagePath(){
		return "ILLEGAL ACCESS.";
	}
	
	class FieldResponse{
		Boolean success = true;
		List<FieldObject> fields;

		public Boolean getSuccess(){
			return success;
		}

		public List<FieldObject> getFields(){
			return fields;
		}
	}

	class StatusResponse{
		Boolean success = true;

		public Boolean getSuccess(){
			return success;
		}
	}



	/**
	 * Drop a proxy from the mapping. Returns Json instead of HTML
	 * 
	 * @param ip
	 * @param domain
	 * @return
	 */
	@RequestMapping(value = "/getResults", method = RequestMethod.POST,produces = "application/json")
	@ResponseBody FieldResponse getResults(@RequestParam("query") String like,@RequestParam("qfield") String field){
		FieldResponse fr = new FieldResponse();
		fr.fields = handler.getFields(like,field);
		return fr;
	}

	/**
	 * Drop a proxy from the mapping. Returns Json instead of HTML
	 * 
	 * @param ip
	 * @param domain
	 * @return
	 */
	@RequestMapping(value = "/addResults", method = RequestMethod.POST,consumes = "application/json",produces = "application/json")
	@ResponseBody StatusResponse addResults(@RequestBody List<FieldObject> fields){
		StatusResponse sr = new StatusResponse();
		handler.submitFields(fields);		
		return sr;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(StandardsAppClient.class, args);
	}
}