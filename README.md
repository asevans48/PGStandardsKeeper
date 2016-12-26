# PGStandardsKeeper

This tool is meant for ETL developers, programmers, and just about anyone to keep track of any database but with extensive access to PostgreSQL.


## Why a Standards Tool

The standards tool uses the scalatra framework and postgreSQL to maintain records. This extends the information schema and aims to provide a graphical
structure to it as well in the long run. For now, all I need is standards documentation. Yes, this is based on my own needs.

PostgreSQL currently does not have a decent standards tracking tool and as far as I can tell, no database currently has a tool that allows for developers
to track changes and standards for their databases. 

## Tracking Standards

The standards tracking tool keeps records in the following format. It is bare bones. You insert the fields. When a graphical view of the metadata is created, 
the column and table names will be used to grab meta data information. 

The user inserts the following record via graphical interface. These will be better organized as time goes on. I really just need a simple standards tracker at
the moment.


- table : The table ame to use
- column : The column to use
- type : The database type (e.g. integer, varchar, NUMBER)
- standard : A regular expression standards format (in case you want to do validation) or a description
- description : Data type description

## Setting Up the Project

The project requires some extra setup in the form of an XML file. The path must be set in the ClientConfig class before building the project for deployment on a server. This will be changed to a more standard folder later. The following file must be filled in.

```
<beans 
xsi:schemaLocation="http://www.springframework.org/schema/beans   http://www.springframework.org/schema/beans/spring-beans-4.0.xsd   http://www.springframework.org/schema/util    http://www.springframework.org/schema/util/spring-util-4.0.xsd         http://www.springframework.org/schema/mvc         http://www.springframework.org/schema/mvc/spring-mvc-4.0.xsd   http://www.springframework.org/schema/context   http://www.springframework.org/schema/context/spring-context-4.0.xsd" default-lazy-init="false" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:util="http://www.springframework.org/schema/util" xmlns:p="http://www.springframework.org/schema/p" xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:context="http://www.springframework.org/schema/context" xmlns="http://www.springframework.org/schema/beans">
     <context:annotation-config/>
     <context:component-scan base-package="org.aevans.simplrtek.StandardsAppClient"/>
     <bean id="props" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
          <property name="locations">
               <list> 
        		    <value>file:~/Production.properties</value>
               </list>
          </property>
     </bean>
     <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
          <property value="org.postgresql.Driver" name="driverClassName"/>
          <property value="${jdburl}" name="url"/>
          <property value="${jdbuser}" name="username"/>
          <property value="${jdbpass}" name="password"/>
          <property value="10" name="initialSize"/>
          <property value="true" name="defaultAutoCommit"/>
          <property value="50" name="maxTotal"/>
          <property value="5" name="minIdle"/>
          <property value="Select 1" name="validationQuery"/>
          
     </bean>
     <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
          <property ref="dataSource" name="dataSource"/>
     </bean>
     <!--  DAO Mapper Goes Here-->
     <bean id="DatabaseHandler" class="org.aevans.simplrtek.jdbc.DatabaseHandler" init-method="initDbs"> 
     	<property name="table" value="fields.dbfields"/>
		<property name="keyTable" value="fields.keys"/>
		<property name="indexTable" value="fields.indices"/>
     </bean>
     <bean id="standardsAppClient" class="org.aevans.simplrtek.standards.StandardsAppClient">
     </bean>
     
</beans>
```

The database properties in the dataSource bean should be set appropriately. This example uses a properties file.
