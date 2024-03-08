import React, { useState } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { AUTH_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  checkToken,
  getTokenFromLocalStorage,
  register,
} from "../../slices/shopSlice";

export default function Register() {
  const { shopName } = useParams();
  const [password, setPassword] = useState<string>("");
  const [rootPassword, setRootPassword] = useState<string>("");
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const isSignedIn = useSelector((state: RootState) => state.shop.isSignedIn);
  const hasLoaded = useSelector((state: RootState) => state.shop.hasLoaded);
  const isLoading = useSelector((state: RootState) => state.shop.isLoading);
  const token = useSelector((state: RootState) => state.shop.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getTokenFromLocalStorage());
  }, []);

  React.useEffect(() => {
    token && dispatch(checkToken({}));
  }, [token]);

  React.useEffect(() => {
    if (isSignedIn) {
      navigate(`/${shopName}/admin`, { replace: true });
    }
  }, [isSignedIn, hasLoaded]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card
        className="w-[80%] h-[80%] sm:w-[40%] flex flex-col items-center justify-center"
        title={<div className="text-center">{AUTH_LANG[3][lang]}</div>}
      >
        <Password
          feedback={false}
          value={rootPassword}
          onChange={(e) => setRootPassword(e.target.value)}
          placeholder={AUTH_LANG[6][lang]}
          className="w-full mt-1 mb-2"
          inputClassName="w-full"
          toggleMask
        />
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={AUTH_LANG[2][lang]}
          className="w-full mt-1 mb-2"
          inputClassName="w-full"
          toggleMask
        />
        <Link to={`/${shopName}/admin/login`}>
          <small>{AUTH_LANG[5][lang]}</small>
        </Link>
        <Button
          label={AUTH_LANG[3][lang]}
          className="w-full"
          onClick={() => {
            shopName &&
              dispatch(register({ shopName, password, rootPassword }));
          }}
        />
      </Card>
    </div>
  );
}
