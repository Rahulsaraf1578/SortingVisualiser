const barsEl = document.getElementById('bars');
let totalBars;
let barSize = [];
let screenWidth = screen.availWidth;
let currentWidth = screen.availWidth;
let speed=500;
let transTime=450;
let isSorting = 0;
const colorCompare = "#f40000";
const colorBar = "#fee440";
const colorSorted = "#55a630";
window.addEventListener('resize',addBars);

let barsNoEL = document.getElementById('bars_no');
if(screenWidth<=576){
    document.getElementById('numbers').innerHTML = "<input id='bars_no' class='input' type='range' min=10 max=30 step=1 value=15>";
    barsNoEL = document.getElementById('bars_no');
    barsNoEL.value = 10;
}
let barsSpeedEl = document.getElementById(`bars_speed`);
barsNoEL.addEventListener("input",addBars);
barsSpeedEl.addEventListener("input", ()=>{
    let diff;
    
    if(parseInt(barsSpeedEl.value)>=500){
        diff = parseInt(barsSpeedEl.value)-500;
        speed = 500-diff;
    }else{
        diff = 500-parseInt(barsSpeedEl.value);
        speed = 500+diff;
    }
    
    transTime = speed-50;
})

addBars();


function addBars(){
    if(isSorting){
        return;
    }
    removeBars();
    screenWidth = screen.availWidth;
    totalBars = barsNoEL.value;
    let mainPadding = parseInt(window.getComputedStyle(document.getElementById('bars'), null).getPropertyValue('padding-left'));
    let wth = Math.floor((screenWidth-(2*mainPadding)-(totalBars-1)*3)/totalBars);
    barSize = [];
    for(let i=0;i<totalBars;i++){
        barSize[i] = 2*Math.floor(Math.random() * 150)+20;// Returns a random integer from 0 to 100:
        let divEl = document.createElement('div');
        divEl.classList.add('bar');
        divEl.style.width = wth/16+"rem";
        divEl.setAttribute('id',`bar${i}`);
        divEl.style.height = barSize[i]/16+"rem";
        divEl.style.marginLeft = i*(wth+3)/16+"rem";
        if(wth<=20){
            divEl.style.fontSize = 0;
        }else if(wth<=32){
            divEl.style.fontSize = wth/2+2+"px";
        }else{
            divEl.style.fontSize = 18+"px";
        }
        if(totalBars<=49){
            divEl.innerText = barSize[i];
        }
        barsEl.appendChild(divEl);
    }
    
}
function removeBars(){
    const barEl = document.querySelectorAll('.bar');
    barEl.forEach(bar=>{
        bar.remove();
    })
}

const arrayEl = document.querySelector('.headerBtn__array');
arrayEl.addEventListener('click',()=>{
    if(!isSorting){
        addBars();
    }
})

function swap(el1,el2,x,y)
{
    const l = el1.offsetLeft;
    const r = el2.offsetLeft;
    el1.style.transition = "margin "+transTime+"ms";
    el2.style.transition = "margin "+transTime+"ms";
    let padding = parseInt(window.getComputedStyle(document.getElementById('bars'), null).getPropertyValue('padding-left'));
    el1.style.marginLeft = r-padding+"px";
    el2.style.marginLeft = l-padding+"px";

    let temp = barSize[x];
    barSize[x] = barSize[y];
    barSize[y] = temp;

    let tempId = el1.id;
    el1.id = el2.id;
    el2.id = tempId;

}
let x=1;
async function bubbleSort(){
    const len = barSize.length;
    // console.log(len);
    for(let i=0;i<len-1;i++){
        let flag=0;
        for(let j=0;j<len-i-1;j++){
            let el1 = document.getElementById(`bar${j}`);
            let el2 = document.getElementById(`bar${j+1}`);
            el1.style.background = colorCompare;
            el2.style.background = colorCompare;
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }
            if(barSize[j]>barSize[j+1]){
                flag=1;
                swap(el1,el2,j,j+1);
                for(let k=1;k<=x;k++){
                    await new Promise(resolve => setTimeout(() => {resolve()},speed));
                }
                
            }
            el1.style.background = colorBar;
            el2.style.background = colorBar;
            
        }
        if(flag==0){
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }
            for(let j=len-i-1;j>=0;j--){
                document.getElementById(`bar${j}`).style.background = colorSorted;
            }
            break;
        }
        
        //Last height colorcolorSorted        
        document.getElementById(`bar${len-i-1}`).style.background = colorSorted;
        if(i===len-2){
            document.getElementById(`bar${0}`).style.background = colorSorted;
        }
    }
    
    isSorting=0;
    // console.log(isSorting);
}

const bubbleEl = document.querySelector('.headerBtn__bubble');
bubbleEl.addEventListener('click',async ()=>{
    if(!isSorting){
        isSorting=1;
        btnPause();
        await bubbleSort();
        btnPlay();
    }

})

async function selectionSort(){
    const len = barSize.length;
    // console.log(len);
    for(let i=0;i<len;i++){
        let imin = i;
        let el1 = document.getElementById(`bar${i}`);
        el1.style.background = colorCompare;
        for(let j=i+1;j<len;j++){
            let el3 = document.getElementById(`bar${j}`);
            el3.style.background = colorCompare;
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }
            if(barSize[imin]>barSize[j]){
                document.getElementById(`bar${imin}`).style.background = colorBar;
                imin = j;
                document.getElementById(`bar${imin}`).style.background = colorCompare;
            }else{
                el3.style.background = colorBar;
            }
        }
        let el2 = document.getElementById(`bar${imin}`);
        // el2.style.background = colorCompare;
        swap(el1,el2,i,imin);
        for(let k=1;k<=x;k++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }
        
        el1.style.background = colorBar;
        el2.style.background = colorSorted;
        
    }
    
    isSorting=0;
}
    
const selectionEl = document.querySelector('.headerBtn__selection');
selectionEl.addEventListener('click',async ()=>{
    if(!isSorting){
        isSorting=1;
        btnPause();
        await selectionSort();
        btnPlay();
    }

})

async function insertionSort(){
    const len = barSize.length;
    // console.log(len);
    for(let i=1;i<len;i++){
        let j=i;
        while(j>0){
            let el1 = document.getElementById(`bar${j-1}`);
            let el2 = document.getElementById(`bar${j}`);
            el1.style.background = colorCompare;
            el2.style.background = colorCompare;
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }
            if(barSize[j-1]>barSize[j]){
                swap(el1,el2,j-1,j);
                for(let k=1;k<=x;k++){
                    await new Promise(resolve => setTimeout(() => {resolve()},speed));
                }
                el1.style.background = colorBar;
            }else{
                el1.style.background = colorBar;
                el2.style.background = colorBar;
                break;
            }
            j--;
        }
        document.getElementById(`bar${j}`).style.background = colorBar;
    }
    
    let j=len-1;
    while(j>0){
        let el1 = document.getElementById(`bar${j-1}`);
        let el2 = document.getElementById(`bar${j}`);
        el1.style.background = colorCompare;
        el2.style.background = colorCompare;
        for(let k=1;k<=x;k++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }
        if(barSize[j-1]>barSize[j]){
            swap(el1,el2,j-1,j);
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }
            el1.style.background = colorSorted;
        }else{
            el1.style.background = colorSorted;
            el2.style.background = colorSorted;
            break;
        }
        j--;
    }
    for(let k=1;k<=x;k++){
        await new Promise(resolve => setTimeout(() => {resolve()},speed));
    }
    while(j>=0){
        document.getElementById(`bar${j}`).style.background = colorSorted;
        j--;
    }

    isSorting=0;
}
    
const insertionEl = document.querySelector('.headerBtn__insertion');
insertionEl.addEventListener('click',async ()=>{
    if(!isSorting){
        isSorting=1;
        btnPause();
        await insertionSort();
        btnPlay();
    }
    
})
async function partition(low, high){
    let pivot = barSize[high];    // pivot
    let i = low;  // Index of smaller element
    const pEl = document.getElementById(`bar${high}`);
    pEl.style.background = "blue";
    let el1,el2;
    el1 = document.getElementById(`bar${i}`);
    el1.style.background = colorCompare;

    for (let j = low; j <= high- 1; j++)
    {
        // If current element is smaller than or
        // equal to pivot
        el2 = document.getElementById(`bar${j}`);
        el2.style.background = colorCompare;
        for(let k=1;k<=x;k++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }
        if (barSize[j] <= pivot)
        {
            swap(el1,el2,i,j);
            for(let k=1;k<=x;k++){
                await new Promise(resolve => setTimeout(() => {resolve()},speed));
            }

            el1.style.background = colorBar;

            i+=1;    // increment index of smaller element
            el1 = document.getElementById(`bar${i}`);
            el1.style.background = colorCompare;
            el2.style.background = colorBar;

        }
        if(i!=j){
            el2.style.background = colorBar;
        }
        // for(let k=1;k<=x;k++){
        //     await new Promise(resolve => setTimeout(() => {resolve()},speed));
        // }
        
    }
    el1 = document.getElementById(`bar${i}`);
    el2 = document.getElementById(`bar${high}`);
    el1.style.background = colorCompare;

    swap(el1,el2,i,high);
    for(let k=1;k<=x;k++){
        await new Promise(resolve => setTimeout(() => {resolve()},speed));
    }
    pEl.style.background = colorSorted;
    
    return (i);
}

async function quickSort(low,high){
    for(let k=1;k<=x;k++){
        await new Promise(resolve => setTimeout(() => {resolve()},speed));
    }
    if(low<high){
        let pi = await partition(low,high);
        // console.log(pi);
        
        await quickSort(low, pi-1);
        
        await quickSort(pi+1, high);
        
    }else if(low===high){
        document.getElementById(`bar${low}`).style.background = colorSorted;
    }

    // for(let i=0;i<low;i++){
    //     document.getElementById(`bar${i}`).style.opacity = 1;
    // }
    // for(let i=high+1;i<barSize.length;i++){
    //     document.getElementById(`bar${i}`).style.opacity = 1;
    // }
    
}

async function quickSortMain(){
    let low = 0, high = barSize.length-1;
    await quickSort(low,high);
    isSorting = 0;
}

const quickEl = document.querySelector('.headerBtn__quick');
quickEl.addEventListener('click',async ()=>{
    if(!isSorting){
        isSorting=1;
        btnPause();
        await quickSortMain();
        btnPlay();
    }
    
})

function barChange(k, i, val){
    let el2 = document.getElementById(`bar${k}`);
    
    el2.style.background = colorCompare;
    el2.style.transition = "all "+transTime+"ms";

    barSize[k] = val;
    el2.style.height = val+"px";
    el2.innerText = val;
    el2.style.background = colorBar;
}

async function merge(low, m, high){
    for(let t=low;t<=high;t++){
        document.getElementById(`bar${t}`).style.background = "blue";
    }
    for(let p=1;p<=x;p++){
        await new Promise(resolve => setTimeout(() => {resolve()},speed));
    }
    let i,j,k,nl,nr;
    nl = m-low+1;
    nr = high-m;
    let L=[nl], R=[nr];
    for(i=0;i<nl;i++){
        L[i] = barSize[low+i];
    }
    for(j=0;j<nr;j++){
        R[j] = barSize[m+1+j];
    }
    i=0; j=0; k=low;
    

    while(i<nl && j<nr){
        for(let p=1;p<=x;p++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }
        if(L[i]<=R[j]){
            barChange(k,i+low,L[i]);
            i++;
        }else{
            barChange(k,j+m+1,R[j]);
            j++;
        }
        k++;
    }
    while(i<nl){
        for(let p=1;p<=x;p++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }

        barChange(k,i+low,L[i]);
        i++;
        k++;
    }
    while(j<nr){
        for(let p=1;p<=x;p++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }

        barChange(k,j+m+1,R[j]);
        j++;
        k++;
    }

    for(let t=low;t<=high;t++){
        document.getElementById(`bar${t}`).style.background = colorBar;
    }
    for(let p=1;p<=x;p++){
        await new Promise(resolve => setTimeout(() => {resolve()},speed));
    }

}

async function mergeSort(low, high){
    // for(let k=1;k<=x;k++){
    //     await new Promise(resolve => setTimeout(() => {resolve()},speed));
    // }
    if(low<high){
        let m = Math.floor(low+(high-low)/2);
        await mergeSort(low,m);
        await mergeSort(m+1,high);
        await merge(low,m,high);
    }
}

const mergeEl = document.querySelector('.headerBtn__merge');
mergeEl.addEventListener('click',async ()=>{
    if(!isSorting){
        isSorting=1;
        btnPause();
        await mergeSort(0,barSize.length-1);
        for(let i=0;i<barSize.length;i++){
            document.getElementById(`bar${i}`).style.background = colorSorted;
        }
        btnPlay();
        for(let p=1;p<=x;p++){
            await new Promise(resolve => setTimeout(() => {resolve()},speed));
        }
        // console.log("Merge completed");
        isSorting = 0;
    }
    
})

playEl = document.getElementById('btnPlay');

function btnPause(){
    playEl.classList.add('paused');
}

function btnPlay(){
    playEl.classList.remove('paused');
}

playEl.addEventListener('click',()=>{
    if(isSorting){
        if(!playEl.classList.contains('paused')){
            playEl.classList.add('paused');
            console.log("Play");
            x=1;
        }else{
            playEl.classList.remove('paused');
            console.log("Pause");
            x=Number.MAX_SAFE_INTEGER;
        }
    }
})
