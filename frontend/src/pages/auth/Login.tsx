import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { AUTH_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkToken,
  getTokenFromLocalStorage,
  login,
} from "../../slices/shopSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

export default function Login() {
  const { shopName } = useParams();
  const [password, setPassword] = useState<string>("");
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const isSignedIn = useSelector((state: RootState) => state.shop.isSignedIn);
  const hasLoaded = useSelector((state: RootState) => state.shop.hasLoaded);
  const isLoading = useSelector((state: RootState) => state.shop.isLoading);
  const token = useSelector((state: RootState) => state.shop.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  React.useEffect(() => {
    dispatch(getTokenFromLocalStorage());
  }, []);

  React.useEffect(() => {
    token && dispatch(checkToken({}));
  }, [token]);

  React.useEffect(() => {
    if (isSignedIn) {
      navigate(`/${shopName}/admin`, { replace: true });
    } else if (hasLoaded) {
      toast.current?.show({
        severity: "error",
        summary: AUTH_LANG[7][lang],
        detail: AUTH_LANG[8][lang],
      });
    }
  }, [isSignedIn, hasLoaded]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Toast ref={toast} />
      <Card
        className="w-[80%] h-[80%] sm:w-[40%] flex flex-col items-center justify-center"
        title={<div className="text-center">{AUTH_LANG[0][lang]}</div>}
      >
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <>
            <Password
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={AUTH_LANG[2][lang]}
              className="w-full mt-1 mb-2"
              inputClassName="w-full"
              toggleMask
            />
            <Button
              label={AUTH_LANG[0][lang]}
              className="w-full"
              onClick={() => {
                shopName && dispatch(login({ shopName, password }));
              }}
            />
          </>
        )}
      </Card>
    </div>
  );
}
