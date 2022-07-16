document.getElementById('fetchData').addEventListener('click',function(){
   fetchWithTimeoutRetry("http://localhost:5555",3000,3);
})

function fetchWithTimeoutRetry(url,timeout = 0,retries,options={}){
    let id = 0;
    if(timeout > 0){
        let controller = new AbortController();
        id = setTimeout(()=> controller.abort(),timeout);
        options.signal = controller.signal;
    }
    if(retries>=0){
        retries--;
        fetch(url,options).then(response =>response.json())
        .then(data => {
            alert('success');
            retries =0;
            if(timeout > 0){
                clearTimeout(id);
            }
        }).catch(error=>{
            if(error.name == 'AbortError' && retries > 0){
                this.fetchWithTimeoutRetry(url, timeout,retries,options);
                return
            }
            console.log(error)
            alert('Errore')
        })
    }
}