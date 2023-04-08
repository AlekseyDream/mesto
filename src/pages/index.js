import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupNotice from "../components/PopupNotice.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profile__button,
  profile_ButtonEdit,
  formEditProfile,
  inputName,
  inputAbout,
  avatarInput,
  cardForm,
  buttonAddCard,
  validationConfig,
  apiParameters,
  avatarForm
}
  from "../utils/constanst.js";

const cardValidator = new FormValidator(cardForm, validationConfig);
cardValidator.enableValidation();

const profileValidator = new FormValidator(formEditProfile, validationConfig);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(avatarForm, validationConfig);
avatarValidator.enableValidation();

const section = new Section({
  renderer: (item) => { section.addItem(createCard(item)); },
}, ".gallery");

const popupProfile = new PopupWithForm(".popup_data_profile-edit", (userData) => {
  popupProfile.loading(true);
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.loading(false, "Сохранить");
    });
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_data_avatar", (userData) => {
  popupAvatar.loading(true);
  api
    .updateUserAvatar(userData)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.loading(false, "Обновить");
    });
});
popupAvatar.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_data_image-add");
popupWithImage.setEventListeners();

const popupCards = new PopupWithForm(".popup_data_card-add", (cardData) => {
  popupCard.loading(true);
  api
    .addNewCard(cardData)
    .then((res) => {
      const cardElement = createCard(res);
      section.addItem(cardElement);
      popupCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCards.loading(false, "Создать");
    });
});
popupCards.setEventListeners();

const popupCardDelete = new PopupNotice(".popup_data_delete", (card) => {
  popupCardDelete.loadingConfirm(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.deleteCard();
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardDelete.loadingConfirm(false);
    });
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  profileAvatar: ".profile__avatar",
});

const api = new Api(apiParameters);

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, cardItems]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.renderItems(cardItems);
  })
  .catch((err) => {
    console.log(err);
  });

  const createCard = (card) => {
    const cardNew = new Card(
      {
        Card: card,
        userId: userId,
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        handleLikeClick: () => {
          if (cardNew.isLike()) {
            api
              .deleteLike(cardNew.getCardId())
              .then((res) => {
                cardNew.likeCard(res.like.length);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            api
              .setLike(cardNew.getCardId())
              .then((res) => {
                cardNew.likeCard(res.like.length);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
        handleDeleteCard: () => {
          popupCardDelete.open(cardNew);
        },
      },
      ".gallery-template"
    );
  const cardElement = cardNew.generateCard();
    return cardElement;
  };

profile__button.addEventListener('click', () => {
  popupProfile.open();
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputAbout.value = info.about;
  profileValidator.resetValid();
});

buttonAddCard.addEventListener('click', () => {
  popupCards.open();
  cardValidator.resetValid();
});

profile_ButtonEdit.addEventListener("click", () => {
  avatarValidator.resetValid();
  popupAvatar.open();
});