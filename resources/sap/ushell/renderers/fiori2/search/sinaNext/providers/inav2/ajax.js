sinaDefine(['../../core/core','../../core/ajax',],function(c,a){var m={};m.Exception=c.Exception.derive({_init:function(d){c.Exception.prototype._init.apply(this,[d]);}});var b=function(o){return function(){return o.apply(this,arguments).then(function(r){return r;}.bind(this),function(e){if(!(e instanceof a.Exception)){return c.Promise.reject(e);}return p(e);}.bind(this));};};var p=function(d){try{errorObject=JSON.parse(d.responseText);var f=errorObject.Error.Code+': '+errorObject.Error.Message;var g=[];if(errorObject.ErrorDetails){for(var i=0;i<errorObject.ErrorDetails.length;++i){var h=errorObject.ErrorDetails[i];g.push(h.Code+': '+h.Message);}}if(errorObject.Messages){for(var j=0;j<errorObject.Messages.length;++j){var k=errorObject.Messages[j];g.push(k.Number+': '+k.Text+' ('+k.Type+')');}}g=g.join('\n');return c.Promise.reject(new m.Exception({message:f,description:g,previous:d}));}catch(e){return c.Promise.reject(d);}};m.createAjaxClient=function(){var d=new a.Client({csrf:true,csrfByPassCache:true});d.postJson=b(d.postJson);d.getJson=b(d.getJson);return d;};return m;});
