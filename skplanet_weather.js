



	/**
	 * 
	 * 		 getMessageText("${pageContext.request.contextPath }", "recommend.message.text2" , "11111|bbbbb");

	 * message properties 에 정의된 메세지 가져오기
	 * @param propertiesId  "recommend.message.text2"
	 * @param para   "paraA|paraB"
	 */
	function getMessageText(contextPath, propertiesId, para) {
		
// 		$.blockUI({
//  			message: '<img src="${pageContext.request.contextPath }/resources/images/loading.gif"/>'
//  	 	});
	
		var returnTxt = "";
		
		$.ajaxSetup({async:false});
		$.ajax({
			type : 'POST',
			url : contextPath + "/restful/message/getMessage.do",
			dataType : "json",
			data: {  "PropertiesId"  : propertiesId
				    ,"param"         : para
				  },
			success : function(data, textStatus, jqXHR) {
				data = data.HashMap.msgText;
				returnTxt = data;

			},

			error : function(jqXHR, textStatus, errorThrown) {
				//alert('updateUseYnChange error: ' + textStatus);
// 				alert("실패하였습니다.");
			},
			complete:function(){
			}
		}); // ajax e
		$.ajaxSetup({async:true});
// 		$.unblockUI();
		
		return returnTxt;

	}
	