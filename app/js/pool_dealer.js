/**
 * Created by ryarborough on 8/1/17.
 */

var poolDealer = (function (window) {
    'use strict';
    //export namespace
    window.poolDealer = window.poolDealer || {};


    // Get the modal
    var modalElement = document.querySelector('#cardModal'),
        // Get the button that opens the modal
        btnEl = document.querySelector('#modalBtn'),
        // Get the <span> element that closes the modal
        spanEl = document.getElementsByClassName("close")[0],

        // filter nodes
        filter = document.querySelectorAll('input[type="checkbox"]'),
        filterChecked = document.querySelectorAll('input[type="checkbox"]:checked'),

        // Card elements
        cards = document.querySelector('.card'),
        /*define the template element*/
        dealerProfile = document.querySelector('#dealer-profile-template'),
        /*get the dealer profile html content*/
        getDealerProfileContent = dealerProfile.innerHTML,
        /*compile dealer profile html*/
        compileDealerProfile = Handlebars.compile(getDealerProfileContent),

        /*define the container to hold template*/
        cardContainer = document.querySelector('.profile-container'),
        /*define the json file / local*/
        _dealerURL = "./js/model/dealers.json",
        setCardContainer;




    //initialize all public vars and methods in global scope
    function init() {
        this.loadJSONASYNC = loadJSONASYNC();
        this.getAllData = getAllData();
    }

    //  template helpers


    // Filter logic
    function filterCheck(check) {

        return check;
    }


    // When the user clicks on the button, open the modal
    function openModal() {
        return modalElement.style.display = "block";
    }


    // When the user clicks on <span> (x), close the modal
    function closeModal() {
        return modalElement.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    /*function closeOnWindow(event) {
     if (event.target == modal){
     modalElement.style.display = "none";
     }
     }*/

    //  template functionality


    /*  load in the json data   */
    function loadJSONASYNC(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', _dealerURL, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4) {
                if (xobj.status == "200") {
                    //the callback will be undefined at the point of function declaration, so check
                    if (callback) {
                        callback(xobj.responseText);
                    }
                } else {
                    console.log('status of xhr request', xobj.status);
                }
            }

        };
        xobj.send(null);

    }

    /*get json response object*/
    function getAllData() {
        return (loadJSONASYNC(function (response) {
            var parsedRes = JSON.parse(response),
                // clone the parsed response to keep values immutable
                clonedRes = Object.assign({}, parsedRes), dealerCopy, dealerFilter, dealerProps;

            for (var key in clonedRes) {
                // check for props associated to own object, and not it's prototype
                if (clonedRes.hasOwnProperty(key)) {
                    dealerCopy = [];
                    // create a copy-dealer array to hold data[i] of dealer property
                    // push dealers to current array state
                    dealerCopy.push(clonedRes);
                    //console.log(dealerCopy);
                    // copy dealers array, and loop through current array state, to retrieve props
                    dealerCopy.map(function (item) {
                        var dealers = item.dealers;
                        console.log('dealers', dealers);

                        /*if (item.dealers.data.certifications === "Installation Pro"){
                         if (inputEl !== null || undefined){
                         //onkeyup event of input field, return the matching dealer items name property
                         //append to the input field element
                         inputEl.onkeyup = function(event){
                         optionsEl.value = item[0].name;
                         console.log('optionsElement', optionsEl.value);
                         console.log('dataList + optionsEl', dataList);
                         dataList.innerHTML = optionsEl;

                         }
                         }
                         }*/

                        //get value of current selected filter option here...

                        //push current value to a array
                        //return array values of those that are selected
                        if(dealers !== null || undefined){
                            console.log(typeof dealers);
                            /*define the template element*/
                            var dealerProfile = document.querySelector('#dealer-profile-template').innerHTML;

                            /*compile dealer profile html*/
                            var compileDealerProfile = Handlebars.compile(dealerProfile);
                            cardContainer.innerHTML = compileDealerProfile(dealers);
                            setCardContainer = cardContainer;
                        }

                        return dealers;

                    }).filter(function (x) {
                        var certs = x[0].data.certifications;
                        console.log('certs', certs);

                        /*if (certs[0] == "Installation Pro"){
                            console.log('this is Installation');
                        }else if (certs[1] == "Residential Pro"){
                            console.log('this is Residential');
                        }else if (certs[2] == "Commercial Pro"){
                            console.log('this is Commercial');
                        }else if (certs[3] == "Service Pro"){
                            console.log('this is Service');
                        }else {
                            console.log('Try Again!!!');
                        }*/


                        /*switch (certs) {
                         case "Installation Pro":
                         console.log('Installation Pro');
                         break;
                         case "Residential Pro":
                         console.log('Residential Pro');
                         break;
                         case "Service Pro":
                         console.log('Service Pro');
                         break;
                         case "Commercial Pro":
                         console.log('Commercial Pro');
                         break;

                         default:
                         console.log('Sorry, we are out of ' + certs + '.');
                         }*/
                    });


                }
            }


        }.bind(this)));
    }


    //  event delegations
    /*if (btnEl) {
        btnEl.addEventListener("click", openModal, false);
    } else if (spanEl) {
        spanEl.addEventListener("click", closeModal, false);
    }*/


    //return global api
    return {
        init: init
    };


})(window);


