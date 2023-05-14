const host = "http://localhost:5000/";
document.querySelector("#create-short-url").addEventListener("click",function(){
    let longurl = document.querySelector("#longurl").value.trim();
    if(longurl.length == 0){
        alert("Enter valid url");
        return;
    } else if(!(longurl.startsWith("http://") || longurl.startsWith("https://"))){
        alert("Enter valid link");
        return;
    }
    fetch(host+"api/create-short-url",{
        method:"POST",
        body:JSON.stringify({
            longurl:longurl
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.status == "ok"){
            document.querySelector("#short-url").innerText = host + data.shorturlid;
            document.querySelector("#short-url").href = host + data.shorturlid;
            let html = `
                <tr>
                    <td>${longurl}</td>
                    <td>${host}${data.shorturlid}</td>
                </tr>
            `;
            document.querySelector("#list_urls tbody").innerHTML += html;
        }
    }).catch(function(error){
        alert("Something went wrong");
    })
});
(function(){
    fetch(host+"api/get-all-short-urls").then(function(response){
        return response.json();
    }).then(function(data){
        let html = "";
        for(let i=0;i<data.length;i++){
            html += `
                <tr>
                    <td>${data[i].longurl}</td>
                    <td>${host}${data[i].shorturlid}</td>
                </tr>
            `;
        }
        document.querySelector("#list_urls tbody").innerHTML = html;
    }).catch(function(error){
        alert("Something went wrong");
    })
})();