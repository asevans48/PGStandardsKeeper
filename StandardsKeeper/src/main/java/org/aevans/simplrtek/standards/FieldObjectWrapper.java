package org.aevans.simplrtek.standards;

import org.aevans.simplrtek.standards.FieldObject;
import java.util.List;

public class FieldObjectWrapper{
		public List<FieldObject> fields;

		public FieldObjectWrapper(){

		}

		public List<FieldObject> getFields(){
			return fields;
		}

		public void setFields(List<FieldObject> fields){
			this.fields = fields;
		}
}