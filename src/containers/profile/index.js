import React from "react";
import { CommonLayout } from "../../components";
import ProfilePage from "./profile-page";

const Profile = () => {
  return (
    <CommonLayout parent="home" title="profile">
      <ProfilePage />
    </CommonLayout>
  );
};

export default Profile;
