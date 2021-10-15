(()=>{"use strict";var e=".popup",t=Array.from(document.querySelectorAll(e)),n=Array.from(document.querySelectorAll(".popup__close-button"));function r(e){e.classList.add("popup_opened"),window.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_opened"),window.removeEventListener("keydown",c)}var c=function(e){"Escape"===e.key&&o(document.querySelector(".popup_opened"))},a=document.querySelector(".profile__title"),i=document.querySelector(".profile__subtitle"),u=document.querySelector(".profile__avatar"),l=document.querySelector("#formEditProfile").elements.name,s=document.querySelector("#formEditProfile").elements.about;function d(e,t){e.classList.contains("profile__info")&&(a.textContent=t.name,i.textContent=t.about,u.src=t.avatar),e.classList.contains("popup_type_edit-profile")&&(l.value=t.name,s.value=t.about)}var f=["inputSelector","inactiveButtonClass"],m=["formSelector","fieldsetSelector","submitButtonSelector"];function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var v=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)};var y=document.querySelector(".popup_type_image-preview");function _(e,t){var n=e.querySelector(".form__submit-button");t?n.textContent="Сохранение...":(e.classList.contains("popup_type_edit-profile")&&(n.textContent="Сохранить"),e.classList.contains("popup_type_add-card")&&(n.textContent="Создать"))}var h={baseUrl:"https://nomoreparties.co/v1/plus-cohort-2",headers:{authorization:"a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5","Content-Type":"application/json"}},S=document.querySelector(".cards__list");function b(e,t){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);function o(e){var t=e.querySelector(".card__like-button");e.isLiked?t.classList.add("card__like-button_active"):t.classList.remove("card__like-button_active"),e.querySelector(".card__likes").textContent=e.likesCount}n.id=t._id,n.querySelector(".card__title").textContent=t.name,n.querySelector(".card__image").src=t.link,n.querySelector(".card__image").alt=t.name,n.isLiked=t.likes.some((function(t){return t._id===e})),n.likesCount=t.likes.length,o(n),n.querySelector(".card__like-button").addEventListener("click",(function(){var e;n.isLiked?(e=t._id,fetch("".concat(h.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){n.likesCount=e.likes.length,n.isLiked=!1,o(n)})).catch((function(e){console.log("Ошибка: ".concat(e))})):function(e){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(t._id).then((function(e){n.likesCount=e.likes.length,n.isLiked=!0,o(n)})).catch((function(e){console.log("Ошибка: ".concat(e))}))}));var c=n.querySelector(".card__delete-button");return t.owner._id===e?c.addEventListener("click",(function(e){var n;(n=t._id,fetch("".concat(h.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){return e.target.parentElement.remove()})).catch((function(e){console.log("Ошибка: ".concat(e))}))})):c.classList.add("card__delete-button_inactive"),n.querySelector(".card__image").addEventListener("click",(function(){var e,n,o,c;e=t.link,n=t.name,o=y.querySelector(".popup__image"),c=y.querySelector(".popup__image-title"),o.src=e,o.alt=n,c.textContent=n,r(y)})),n}function E(e){S.prepend(e)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var k=document.querySelector(".profile__info"),q=document.querySelector(".profile__avatar-container"),C=document.querySelector(".popup_type_edit-avatar"),L=document.querySelector("#formEditAvatar"),j=document.querySelector("#formEditAvatar").elements.avatar,A=document.querySelector("#formEditProfile"),P=document.querySelector(".popup_type_edit-profile"),x=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),O=document.querySelector(".popup_type_add-card"),U=document.querySelector("#formAddCard"),B=document.querySelector("#formAddCard").elements.place,T=document.querySelector("#formAddCard").elements.picture,D={formSelector:".form",fieldsetSelector:".form__input-container",inputSelector:".form__field-input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_inactive",inputErrorClass:"form__field-input_type_error",errorClass:"form__field-error_active"};A.addEventListener("submit",(function(e){var t,n,r;e.preventDefault(),_(P,!0),(t={name:l.value,about:s.value},n=t.name,r=t.about,fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){var t=e.name,n=e.about;a.textContent=t,i.textContent=n})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){_(P,!1),o(P)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var t,n,r,c={name:B.value,link:T.value};_(O,!0),(t=c,n=t.name,r=t.link,fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){E(b(e.owner._id,e))})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){_(O,!1),U.reset(),U.querySelector(D.submitButtonSelector).classList.add(D.inactiveButtonClass),o(O)}))})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),_(C,!0),(t=j.value,fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){u.src=e.avatar})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){_(C,!1),o(C)}))})),x.addEventListener("click",(function(){var e={name:a.textContent,about:i.textContent};d(P,e),A.querySelector(D.submitButtonSelector).classList.remove(D.inactiveButtonClass),r(P)})),t.forEach((function(t){return t.addEventListener("click",(function(t){t.target===t.currentTarget&&o(t.target.closest(e))}))})),n.forEach((function(t){t.addEventListener("click",(function(t){o(t.target.closest(e))}))})),w.addEventListener("click",(function(){r(O)})),q.addEventListener("click",(function(){r(C)})),Promise.all([fetch("".concat(h.baseUrl,"/users/me"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),fetch("".concat(h.baseUrl,"/cards"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];d(k,o),function(e,t){t.forEach((function(t){E(b(e,t))}))}(o._id,c)})).catch((function(e){console.log(e)})).finally((function(){var e,t,n,r,o;t=(e=D).formSelector,n=e.fieldsetSelector,r=e.submitButtonSelector,o=p(e,m),Array.from(document.querySelectorAll(t)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),Array.from(e.querySelectorAll(n)).forEach((function(t){!function(e,t,n){var r=n.inputSelector,o=n.inactiveButtonClass,c=p(n,f),a=Array.from(e.querySelectorAll(r));v(a,t,o),a.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){var r=n.inputErrorClass,o=n.errorClass,c={formElement:e,inputElement:t};t.validity.valid?function(e,t){var n=e.inputElement,r=t.inputErrorClass,o=t.errorClass,c=e.formElement.querySelector(".".concat(n.id,"-error"));n.classList.remove(r),c.classList.remove(o),c.textContent=""}(c,{inputErrorClass:r,errorClass:o}):function(e,t){var n=e.inputElement,r=t.errorMessage,o=t.inputErrorClass,c=t.errorClass,a=e.formElement.querySelector(".".concat(n.id,"-error"));n.classList.add(o),a.textContent=r,a.classList.add(c)}(c,{errorMessage:t.validationMessage,inputErrorClass:r,errorClass:o})}(e,n,c),v(a,t,o)}))}))}(t,e.querySelector(r),o)}))}))}))})();