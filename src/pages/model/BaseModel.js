export default class BaseModel {
    static getModel (model) {
        let d = JSON.parse(JSON.stringify(model));
        let fn = (data) =>{
            for(let key in data){
                if(!data[key] && typeof data[key]!=='boolean' && data[key]!==0){
                    delete data[key];
                }else if(Array.isArray(data[key])){
                    data[key] = data[key].map(e=>{
                        if(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(e)){
                            e = (new Date(e.replace('T',' ').replace(/\.[\w]+/g,''))).Format('yyyy-MM-dd hh:mm:ss');
                        }else if(e instanceof Object){
                            e = fn(e);
                        }
                        return e;
                    })
                }else if(data[key] instanceof Object){
                    data[key] = fn(data[key]);
                }else if(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(data[key])){
                    data[key] = (new Date(data[key].replace('T',' ').replace(/\.[\w]+/g,''))).Format('yyyy-MM-dd hh:mm:ss');
                }
            }
            return data;
        }
        return fn(d);
    }
}
