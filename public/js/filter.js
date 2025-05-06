
  let taxSwitch = document.getElementById("switchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
   for(tax of taxInfo) {
    if(tax.style.display != "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
   }
    
  })



  // let filters = document.querySelectorAll(".filter");
 
  // filters.forEach(data => {
  //    data.addEventListener("click", () => {
  //      let val = data.getAttribute("data-val");
  //      console.log(val)
 
  //      filtered = allListing.filter(el => el.category.toLowerCase().includes(val) )
  //      console.log(filtered);
  //      //fileredData(val);
  //    })
  //  })


  

  // let filters = document.querySelectorAll('#filters .filter')  
  // for(let filter of filters) {
  //   filter.addEventListener("click", () => {
  //     let selectedCategory = filter.querySelector('p').textContent.trim();
  //     console.log('Clicked:', selectedCategory);
  //   })
  // }


  // const filters = document.querySelectorAll('.filter');
  // const listings = document.querySelectorAll('.listing-link');

  // filters.forEach(filter => {
  //   filter.addEventListener('click', () => {
  //     const selectedCategory = filter.getAttribute('data-category');

  //     // Toggle active class
  //     filters.forEach(f => f.classList.remove('active'));
  //     filter.classList.add('active');

  //     // Filter listings
  //     listings.forEach(listing => {
  //       const category = listing.getAttribute('data-category');
  //       if (category === selectedCategory) {
  //         listing.style.display = 'block';
  //       } else {
  //         listing.style.display = 'none';
  //       }
  //     });
  //   });
  // });

