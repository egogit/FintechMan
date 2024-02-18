import React from 'react';

import { ProfileWrapper, ProfileBox } from '../../styles/ui/ProfileStyle';
import profile from '../../assets/icon/profile.png';

function Profile() {
  return (
    <ProfileWrapper>
      <ProfileBox src={profile} alt="" />
    </ProfileWrapper>
  );
}

export default Profile;
