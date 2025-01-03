import apiClient from '@/api/apiClient';
import Modal from '@/components/Modal/Modal';
import { ReactNode, useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { IoIosArrowDropright } from 'react-icons/io';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { PiImagesSquareBold } from 'react-icons/pi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import SettingComponent from '../SettingPage/Components/SettingComponent/SettingComponent';

import useAuthStore from '@/stores/authStore';
import useUserInfoStore from '@/stores/userInfoStore';
import { s_componentsContainer, s_modalInputStyle, s_modalText, s_textContainer, s_titleContainer } from './style';

interface profileComponentsData {
  iconImage: ReactNode;
  text: string;
  rightButton: ReactNode;
}

interface editModalComponentsData {
  title: string;
  modalBody: ReactNode;
  positiveButtonClickListener: () => void;
  negativeButtonClickListener: () => void;
}

const ProfilePage = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useUserInfoStore();
  const { nickname, registeredDate, profileImage, email } = userInfo;

  const signOut = useAuthStore((state) => state.signOut);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalDataIdx = useRef<number>(0);
  const [submitData, setSubmitData] = useState<string>('');
  const [submitImage, setSubmitImage] = useState<File | null>(null);
  const [passwordText, setPasswordText] = useState<string>('현재의 비밀번호를 입력해주세요.');
  const passwordFlag = useRef<boolean>(false);

  function openModalAndChangeIdx(idx: number) {
    modalDataIdx.current = idx;
    setIsModalOpen(true);
  }

  function closeModal() {
    setSubmitData('');
    setSubmitImage(null);
    setIsModalOpen(false);
  }
  function changeSubmitData(str: string) {
    setSubmitData(str);
  }

  const profileComponentsDatas: profileComponentsData[] = [
    {
      iconImage: <MdDriveFileRenameOutline />,
      text: '닉네임 변경',
      rightButton: (
        <FaPlus
          style={{ cursor: 'pointer' }}
          onClick={() => {
            openModalAndChangeIdx(0);
          }}
        />
      ),
    },
    {
      iconImage: <PiImagesSquareBold />,
      text: '프로필 사진 변경',
      rightButton: (
        <FaPlus
          style={{ cursor: 'pointer' }}
          onClick={() => {
            openModalAndChangeIdx(1);
          }}
        />
      ),
    },
    {
      iconImage: <RiLockPasswordLine />,
      text: '비밀번호 변경',
      rightButton: (
        <IoIosArrowDropright
          style={{ cursor: 'pointer' }}
          onClick={() => {
            openModalAndChangeIdx(2);
          }}
        />
      ),
    },
    {
      iconImage: <BiTrash />,
      text: '회원 탈퇴',
      rightButton: (
        <ImCross
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={() => {
            openModalAndChangeIdx(3);
          }}
        />
      ),
    },
  ];

  function changeNickname() {
    apiClient({
      method: 'PUT',
      url: '/members/edit/nickname',
      data: { nickname: submitData },
    })
      .then((response) => {
        if (response.data.code === 200) {
          setUserInfo((prev) => ({ ...prev, nickname: response.data.data.nickname }));
          alert('닉네임 변경이 완료되었습니다.');
        } else {
          alert('오류가 발생하였습니다.');
        }
      })
      .catch((err) => {
        alert('오류가 발생하였습니다. 다시 시도해 주십시오.');
        console.log(err);
      })
      .finally(() => {
        navigate(0);
      });
  }

  function changeProfileImage() {
    if (submitImage === null) {
      alert('변경할 이미지를 등록해주세요.');
      return;
    }
    if (!submitImage.type.startsWith('image/')) {
      alert('올바른 파일을 등록해주세요');
      return;
    }
    const formData = new FormData();
    formData.append('profileImage', submitImage);
    apiClient({
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: '/members/edit/profileimg',
      data: formData,
    })
      .then((response) => {
        if (response.data.code === 200) {
          setUserInfo((prev) => ({ ...prev, profileImage: response.data.data.profileImage }));
          alert('프로필 사진 변경이 되었습니다.');
        } else {
          alert('오류가 발생하였습니다.');
        }
      })
      .catch((err) => {
        alert('오류가 발생하였습니다. 다시 시도해 주십시오.');
        console.log(err);
      })
      .finally(() => {
        navigate(0);
      });
  }

  function changePassword() {
    if (!passwordFlag.current) {
      //현재 비밀번호 인증이 되기 전
      apiClient({
        method: 'POST',
        url: '/members/edit/checkuser',
        data: { password: submitData },
      })
        .then((response) => {
          if (response.data.code === 200) {
            setPasswordText('새롭게 사용하실 비밀번호를 입력해주세요.');
            setSubmitData('');
            passwordFlag.current = true;
          } else if (response.data.code === 602) {
            alert('비밀번호가 일치하지 않습니다. 다시 시도해 주십시오.');
            navigate(0);
          } else {
            alert('비밀번호 형식을 맞춰주세요');
            navigate(0);
          }
        })
        .catch((err) => {
          alert('오류가 발생하였습니다. 다시 시도해 주십시오.');
          console.log(err);
        });
    } else {
      //현재 비밀번호 인증 후
      apiClient({
        method: 'PUT',
        url: '/members/edit/credentials',
        data: { password: submitData },
      })
        .then((response) => {
          if (response.data.code === 200) {
            alert('비밀번호 변경이 완료되었습니다.');
          } else {
            alert('비밀번호는 8~15자, 영문, 숫자, 특수문자를 포함해야 합니다.');
          }
        })
        .catch((err) => {
          alert('비밀번호는 8~15자, 영문, 숫자, 특수문자를 포함해야 합니다.');
          console.log(err);
        })
        .finally(() => {
          navigate(0);
        });
    }
  }

  function deleteUser() {
    apiClient({
      method: 'PUT',
      url: '/members/delete',
    })
      .then((response) => {
        if (response.data.code === 200) {
          alert('회원 탈퇴가 완료되었습니다');
          signOut();
          navigate('/');
        } else {
          alert('오류가 발생하였습니다.');
        }
      })
      .catch((err) => {
        alert('오류가 발생하였습니다. 다시 시도해 주십시오.');
        console.log(err);
      });
    changeSubmitData('');
  }

  const editModalComponentsData: editModalComponentsData[] = [
    {
      title: '닉네임 변경',
      modalBody: (
        <>
          <div css={s_modalText}>
            새로운 닉네임을 입력해주세요.
            <br /> 그 후 확인 버튼을 눌러주세요.
          </div>
          <input
            css={s_modalInputStyle}
            type="text"
            maxLength={10}
            value={submitData}
            onChange={(e) => {
              changeSubmitData(e.target.value);
            }}
          />
        </>
      ),
      positiveButtonClickListener: changeNickname,
      negativeButtonClickListener: closeModal,
    },
    {
      title: '프로필 사진 변경',
      modalBody: (
        <>
          <div css={s_modalText}>
            새로운 프로필 사진을 선택하신 후,
            <br /> 확인 버튼을 눌러주세요.
          </div>
          <input
            css={s_modalInputStyle}
            type="file"
            accept="image/*"
            maxLength={10}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              e.preventDefault();
              if (e.target.files) {
                setSubmitImage(e.target.files[0]);
              }
            }}
          />
        </>
      ),
      positiveButtonClickListener: changeProfileImage,
      negativeButtonClickListener: closeModal,
    },
    {
      title: '비밀번호 변경',
      modalBody: (
        <>
          <div css={s_modalText}>
            {passwordText}
            <br />그 후 확인 버튼을 눌러주세요.
          </div>
          <input
            css={s_modalInputStyle}
            type="password"
            minLength={8}
            maxLength={20}
            value={submitData}
            onChange={(e) => {
              changeSubmitData(e.target.value);
            }}
          />
        </>
      ),
      positiveButtonClickListener: changePassword,
      negativeButtonClickListener: closeModal,
    },
    {
      title: '회원 탈퇴',
      modalBody: (
        <>
          <div css={s_modalText}>
            정말 탈퇴하시겠습니까?
            <br />
            탈퇴하시려면 확인 버튼을 눌러주세요.
          </div>
        </>
      ),
      positiveButtonClickListener: deleteUser,
      negativeButtonClickListener: closeModal,
    },
  ];
  return (
    <div>
      <div css={s_titleContainer}>
        {isModalOpen ? <Modal {...editModalComponentsData[modalDataIdx.current]} /> : null}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img
              src={profileImage}
              css={{ backgroundColor: 'gray', opacity: 0.7, borderRadius: '50px', width: '70px', height: '70px' }}
            />
          </div>
          &nbsp;
          <p>{nickname}</p>
        </div>
      </div>
      <div css={s_componentsContainer}>
        <div css={s_textContainer}>이메일: {email}</div>
        <div css={s_textContainer}>가입일: {registeredDate}</div>
        {profileComponentsDatas.map((item, index) => {
          return <SettingComponent key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
