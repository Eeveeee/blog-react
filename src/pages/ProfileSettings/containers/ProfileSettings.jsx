import classNames from 'classnames';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { NotificationsContext, UserContext } from '../../../context/context';
import { AddFileForm } from '../../../forms/AddFileForm/AddFileForm';
import { EditableTextInput } from '../../../forms/EditableTextInput/EditableTextInput';
import { ImagePreview } from '../../../forms/ImagePreview/ImagePreview';
import { errors } from '../../../global/errors';
import { limits } from '../../../global/limits';
import { reauthenticateUser } from '../../../services/AuthService';
import { uploadToStorage } from '../../../services/StorageService';
import { getUserPublic, updateUserPublic } from '../../../services/UserService';
import { Loader } from '../../../shared/Loader/Loader';
import { ChangePasswordModal } from '../../../shared/modals/ChangePasswordModal/ChangePasswordModal';
import { GetPasswordModal } from '../../../shared/modals/GetPasswordModal/GetPasswordModal';
import { extensionsByType } from '../../../utils/extensionsByType';
import { validateFile } from '../../../utils/fileValidation';
import { passwordValidation } from '../../../utils/passwordValidation';
import { toggleScroll } from '../../../utils/toggleScroll';
import s from './ProfileSettings.module.scss';
export function ProfileSettings() {
  const privateFields = ['email', 'emailVerified'];
  const editableFields = {
    username: 'Имя пользователя',
    email: 'Почта',
  };
  const auth = getAuth();
  const history = useHistory();
  const { addNotification } = useContext(NotificationsContext);
  const { user, setUser } = useContext(UserContext);
  const [authModal, setAuthModal] = useState({ state: false, onConfirm: null });
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  useEffect(() => {
    toggleScroll(!changePasswordModal || !authModal);
  }, [authModal, changePasswordModal]);
  function removeProfilePicture() {
    updateUserPublic(auth.currentUser.uid, { photoURL: null })
      .then(() => {
        addNotification({
          type: 'success',
          message: 'Фото успешно удалено',
        });
        reloadUserData();
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: errors(err.code, 'Ошибка удаления фотографии'),
        });
      });
  }
  async function changeProfilePicture(profilePicture) {
    try {
      const url = await uploadToStorage(profilePicture, 'users');
      await updateUserPublic(auth.currentUser.uid, { photoURL: url });
      addNotification({
        type: 'success',
        message: 'Фото успешно обновлено',
      });
      reloadUserData();
    } catch (err) {
      console.error(err);
      addNotification({
        type: 'error',
        message: errors(
          err.code,
          'Ошибка загрузки фотографии, попробуйте ещё раз'
        ),
      });
    }
  }
  function handleNewProfilePicture(files) {
    const profilePicture = files[0];
    const types = ['image'];
    const extensions = extensionsByType(types[0]);
    const validation = validateFile(profilePicture, {
      types,
      extensions,
      maxFileSize: limits.fileSize,
    });
    if (!validation) {
      addNotification({
        type: 'danger',
        message: 'Выбранное изображение не подходит, попробуйте другое',
      });
      return;
    }
    changeProfilePicture(profilePicture);
  }
  function changeUsernameHandler(username) {
    if (username === user.value?.username) {
      addNotification({
        type: 'danger',
        message: 'Имя не может совпадать со старым',
      });
      return;
    }
    changeUsername(username);
  }
  function changeEmailHandler(email) {
    setAuthModal({
      state: true,
      onConfirm: { fn: changeEmail, props: { email } },
    });
  }
  function reloadUserData() {
    setUser((user) => ({ ...user, state: 'fetching' }));
  }
  function changeUsername(username) {
    updateUserPublic(auth.currentUser.uid, { username: username })
      .then(() => {
        addNotification({
          type: 'success',
          message: 'Имя успешно изменено',
        });
        reloadUserData();
      })
      .catch((err) => {
        addNotification({
          type: 'error',
          message: errors(err.code, 'Ошибка смены имени пользователя'),
        });
      });
  }
  function changeEmail(props) {
    const { password, email } = props;
    reauthenticateUser(password)
      .then(() => {
        updateEmail(auth.currentUser, email)
          .then(() => {
            addNotification({
              type: 'success',
              message: 'Email успешно изменён',
            });
            setAuthModal({
              state: false,
              onConfirm: null,
            });
            reloadUserData();
          })
          .catch((err) => {
            console.error(err);
            addNotification({
              type: 'error',
              message: errors(
                err.code,
                'Произошла ошибка смены почты, попробуйте позже'
              ),
            });
          });
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: errors(err.code, 'Возникла ошибка авторизации'),
        });
      });
  }
  async function changePassword(password, newPassword) {
    const isValid = passwordValidation(newPassword);
    if (!isValid.status) {
      addNotification(
        {
          type: 'error',
          message: isValid.errors.join('\n'),
        },
        15000
      );
      return;
    }
    reauthenticateUser(password)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            addNotification({
              type: 'success',
              message: 'Пароль успешно изменён',
            });
            setChangePasswordModal(false);
          })
          .catch((err) => {
            addNotification({
              type: 'error',
              message: errors(
                err.code,
                'Произошла ошибка смены пароля, попробуйте позже'
              ),
            });
          });
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: errors(
            err.code,
            'Возникла ошибка авторизации, проверьте правильность данных'
          ),
        });
      });
  }
  return (
    <div className={classNames(s.profileSettings, 'pageContent')}>
      {authModal.state && (
        <GetPasswordModal
          setModalState={setAuthModal}
          modalState={authModal}
          title={'Введите пароль для подтверждения'}
        />
      )}
      {changePasswordModal && (
        <ChangePasswordModal
          setModalState={setChangePasswordModal}
          changePasswordFn={changePassword}
        />
      )}
      <div className="container">
        <div className={s.outer}>
          {user.state === 'fetching' ? (
            <Loader />
          ) : (
            <div className={s.wrapper}>
              <div className={classNames(s.settingsBlock, s.profileBlock)}>
                <div className={s.title}>Профиль</div>
                <div className={s.profilePhotoBlock}>
                  <div className={s.inputTitle}> Фотография профиля</div>
                  <div className={s.imagePreviewBlock}>
                    <div className={s.previewWrapper}>
                      <ImagePreview file={user.value?.photoURL} />
                    </div>
                    <div className={s.photoManage}>
                      <AddFileForm
                        handleNewFiles={handleNewProfilePicture}
                        text={'Сменить'}
                        multiple={false}
                      />
                      {user.value?.photoURL && (
                        <button
                          onClick={removeProfilePicture}
                          className={s.photoButton}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={classNames(s.inputBlock, s.username)}>
                  <div className={s.inputTitle}>Имя пользователя</div>
                  <EditableTextInput
                    limit={limits.username}
                    defaultValue={user.value.username}
                    setFoo={changeUsernameHandler}
                    name={'username'}
                    autoComplete="name"
                  />
                </div>
              </div>
              <div className={classNames(s.settingsBlock, s.accountBlock)}>
                <div className={s.title}>Аккаунт</div>
                <div className={classNames(s.inputBlock, s.email)}>
                  <div className={s.inputTitle}>Электронная почта</div>
                  <EditableTextInput
                    limit={limits.email}
                    defaultValue={user.value.email}
                    setFoo={changeEmailHandler}
                    type={'email'}
                    name={'email'}
                    autoComplete="email"
                  />
                </div>
                <button
                  onClick={() => {
                    setChangePasswordModal(true);
                  }}
                  className={s.changePasswordButton}
                >
                  Сменить пароль
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
