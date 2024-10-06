// 1 - fetch load and show categories
const loadCategories = () => {
    //fetch data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res => res.json()))
    .then((data => displayCategories(data.categories)))
    .catch((error) => console.log(error))
    
}
function getTimeString(time){
    let hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    let minute = parseInt(remainingSecond / 60);
    remainingSecond = parseInt(remainingSecond / 60);
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    // console.log(buttons);
    for(const btn of buttons){
        btn.classList.remove('active');
    }
}
const loadDetails = async(videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayDetails(data.video);
}
const displayDetails = (video) => {
//   console.log(video);
  const detailsContainer = document.getElementById('modal-content');
  detailsContainer.innerHTML = `<img src = ${video.thumbnail}/>
                                 <p>${video.description}</p>`
//   first way add modal
//   document.getElementById('showModalData').click();
    //  way to 2
    document.getElementById('customModal').showModal();
}
const loadCategoriesVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res => res.json()))
    .then((data) => {
         // sobaike active class remove korbo 
        removeActiveClass();
        //  id ke add korbo active class
        const activeBtn = document.getElementById(`btn-${id}`)
        console.log(activeBtn);
        activeBtn.classList.add('active');
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))

}

 
// create displayCategories
const displayCategories = (datas) =>{
    //add data to display
//    console.log(datas);
datas.forEach((data) => {
    // console.log(data);
    const categoriesContainer = document.getElementById('categories');
    const buttonContainer = document.createElement('div');
    // button.classList = 'btn';
    buttonContainer.innerHTML = ` <button id = "btn-${data.category_id}" onclick = "loadCategoriesVideos(${data.category_id})" class="btn category-btn">${data.category}</button>`
    // add to the display 
    categoriesContainer.append(buttonContainer);
})
    
} 

const loadVideos = (searchText = "") => {
    //fetch data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res => res.json()))
    .then((data => displayVideos(data.videos)))
    .catch((error) => console.log(error))
    
}
const displayVideos = (videos) => {
    const container = document.getElementById('videos');
    container.innerHTML = "";
    if(videos.length === 0){
        container.classList.remove('grid');
        container.innerHTML = `<div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" alt="">
        <h2 class="text-center text-xl font-bold">
            No Content Here in this Category
        </h2>

      </div>`
    }
    else{
        container.classList.add('grid');
    }
    videos.forEach((video) => {
        console.log(video);
        const card =document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML =` <figure class = "h-[200px] relative">
    <img
      src= ${video.thumbnail}
      alt="Shoes" / class ="h-full w-full object-cover">
       ${video.others.posted_date?.length === 0? "": `<span class = "absolute right-2 bottom-2 bg-black text-white rounded p-1 text-xs">${getTimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img src = ${video.authors[0].profile_picture} class = "h-10 w-10 rounded-full">
    </div>
    <div>
    <h2 class = "font-bold">${video.title}</h2>
     <div class = "flex items-center gap-2">
  
    <p class = "text-gray-400">${video.authors[0].profile_name} </p>
       ${video.authors[0].verified === true? `<img class = "w-5" src =https://img.icons8.com/?size=60&id=59733&format=png>`: ""}
     </div>
        <p><button onclick = "loadDetails('${video.video_id}')" class = "btn btn-sm btn-error">Details</button></p>

    </div>
  </div>`
  container.append(card);
        

    })
   

}
document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
})
loadCategories();
loadVideos();
