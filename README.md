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
