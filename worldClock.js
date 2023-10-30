fetch("http://worldtimeapi.org/api/timezone")
.then((res)=>res.json())
.then((res)=>insertCountryValues(res))


function insertCountryValues(val){
    let counties=[]
    let timezones=[]
    let str=''
    for(i=0;i<val.length;i++){
        allTimeCountries.push(val[i].split('/'))
        if(!counties.includes(val[i].split('/')[0]))
        {
            counties.push(val[i].split('/')[0]);
        }
        if(!timezones.includes(val[i].split('/')[1]))
        {
            timezones.push((val[i].split('/')[1]))
        }
    }
    // console.log(allTimeCountries);
    // console.log(counties);
    // console.log(timezones);
    for(i=0;i<counties.length;i++){
        let opt=`<option id='countryOption' value='${counties[i]}'>${counties[i]}</option>`
        fromCountry.innerHTML+=opt
    }
}


let hour=document.getElementById('hour')
let minutes=document.getElementById('minutes')
let seconds=document.getElementById('seconds')
let ampm=document.getElementById('ampm')

let fromCountry=document.getElementById('fromCountry')
let fromRegion=document.getElementById('fromRegion')
let allTimeCountries=[]

let inter;

let option=`<option>---Select Any Region---`


function insertHTML(country,region){
    inter=setInterval(() => {
        fetch(`http://worldtimeapi.org/api/timezone/${country}/${region}`)
        .then((res)=>res.json())
        .then((res)=>tim(res))
    }, 500);
}

function insertNoRegionHTML(country){
    inter=setInterval(() => {
        fetch(`http://worldtimeapi.org/api/timezone/${country}`)
        .then((res)=>res.json())
        .then((res)=>tim(res))
    }, 500);
}


const tim=(res)=>{
    let str=res.datetime
    let ind;
    let len=0;
    let start=0;
    for(i=0;i<str.length;i++){
        if(str[i]=='T'){
            ind=i+1
            start++
        }
        if(str[i]=='.'){
            break;
        }
        if(start>0){
            len++
        }
    }
    ty(str.substr(ind,--len))
}

function ty(time){
    let hrs;
    let mins;
    let secs;
    let str=time
    hrs=Number(str.substr(0,2))
    mins=str.substr(3,2)
    secs=str.substr(6,2)
    // console.log(str);
    if(hrs>12){
        hrs=hrs-12
        ampm.innerHTML='PM'
        // console.log(hrs);
    }
    else{
        ampm.innerHTML='AM'
    }
    if(hrs<10){
        hrs='0'+hrs
    }
    hour.innerHTML=hrs
    minutes.innerHTML=mins
    seconds.innerHTML=secs
    // console.log('own',hrs,mins,secs);
    // console.log(tim());
}


let reg=0;
let count=0;

function insertRegion(e){
    clearInterval(inter)
    fromRegion.innerHTML=option
    hour.innerHTML='00'
    minutes.innerHTML='00'
    seconds.innerHTML='00'
    ampm.innerHTML='AM'

    for(i=0;i<allTimeCountries.length;i++){
        if(e==allTimeCountries[i][0]){
            // console.log('all',allTimeCountries[i]);
            if(allTimeCountries[i].length==2){
                let opt=`<option class='regionOption' value='${allTimeCountries[i][1]}'>${allTimeCountries[i][1]}</option>`
                fromRegion.innerHTML+=opt

            }
            else if(allTimeCountries[i].length==3){
                let opt=`<option class='regionOption' value='${allTimeCountries[i][1]}/${allTimeCountries[i][2]}'>${allTimeCountries[i][1]}/${allTimeCountries[i][2]}</option>`
                fromRegion.innerHTML+=opt
                // console.log('3rd',`${allTimeCountries[i][2]}`);
            }
            else if(allTimeCountries[i].length==1){
                fromRegion.innerHTML='<option>-----</option>'
                insertNoRegionHTML(fromCountry.value)
            }
            // console.log(fromRegion.value);
        }

    }
}



function getTime(region){
    clearInterval(inter)

    if(reg==0)
    {
    insertHTML(fromCountry.value,region)
    }
    else{
        setTimeout(()=>{
            hour.innerHTML='00'
            minutes.innerHTML='00'
            seconds.innerHTML='00'
            ampm.innerHTML='AM'
            insertHTML(fromCountry.value,region)
        },500)
    }
    reg++
}