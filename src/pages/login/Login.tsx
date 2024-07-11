import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [error, setError] = useState(false);
  console.log("rror", error);

  const base64Decode = (base64String: string) => {
    return JSON.parse(atob(base64String));
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const dataArray = data ? base64Decode(data) : [];
    const isLoggedIn = dataArray.some((user: any) => user.isLoggedIn === true);
    console.log("is Logged in", isLoggedIn);
    if (isLoggedIn) {
      navigate("/Dashboard");
    } else {
      console.log("No user is logged in");
    }
  }, []);

  const onSubmit = (e: any) => {
    const data = localStorage.getItem("user-info");
    const dataArray = data ? base64Decode(data) : null;

    const filteredData = dataArray.map((item: any) => {
      if (item.username === e.username) {
        return { ...item, isLoggedIn: true };
      } else {
        return {
          ...item,
        };
      }
    });
    localStorage.setItem("user-info", btoa(JSON.stringify(filteredData)));
    localStorage.setItem("user-Details", btoa(JSON.stringify([])));

    //   if (data !== null) {
    //     try {
    //       const dataa = JSON.parse(data);
    //       console.log("Parsed data:", dataa);

    //       console.log(
    //         "e.username === dataa.username",
    //         e.username,
    //         dataa.username
    //       );
    //       console.log(
    //         "e.password === dataa.password",
    //         e.password,
    //         dataa.password
    //       );

    //       if (e.username === dataa.username && e.password === dataa.password) {
    //         console.log("Username and password match");
    //         navigate("/UserListing");
    //       } else {
    //         console.log("Username or password do not match");
    //       }
    //     } catch (error) {
    //       console.error("Error parsing JSON:", error);
    //     }
    //   } else {
    //     console.log('No data found in localStorage for key "user-info"');
    //   }
    // };

    let credentialsMatch = false;

    dataArray.forEach((dataa: any) => {
      try {
        if (e.username === dataa.username && e.password === dataa.password) {
          credentialsMatch = true;
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

    if (credentialsMatch) {
      console.log("Username and password match");
      navigate("/UserListing");
    } else {
      setError(true);
      console.log("Username or password do not match");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/2 overflow-hidden">
        <img
          className="inset-0 h-auto md:h-full w-full"
          src="https://www.groupeparima.com/wp-content/uploads/2021/06/newsletter.jpg"
          alt="Placeholder"
        />
      </div>

      <div className="lg:w-1/2 lg:h-screen flex items-center justify-center">
        <div className="w-full lg:w-3/4 p-8 rounded-lg">
          <div className="flex items-center justify-center mb-6">
            <img src="./img/logo.png.png" alt="Logo" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              rules={{
                required: "username is required",
              }}
              name="username"
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Input
                      placeholder="Enter your username"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      value={value}
                      className="p-2"
                    />
                    {errors["username"] ? (
                      <p className="text-red-600 text-sm">
                        {" "}
                        {errors["username"]?.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                );
              }}
            />

            <Controller
              control={control}
              rules={{
                required: "password is required",
              }}
              name="password"
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Input.Password
                      placeholder="Enter your password"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      value={value}
                      className="p-2 mt-3"
                    />
                    {errors["password"] ? (
                      <>
                        <p className="text-red-600 text-sm">
                          {" "}
                          {errors["password"]?.message}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              }}
            />
            {error ? (
              <p className="text-red-600 text-sm">
                Username or password does not match
              </p>
            ) : (
              ""
            )}

            <Form.Item className="pt-6">
              <Button type="primary" htmlType="submit" className="p-3 w-full">
                Submit
              </Button>
            </Form.Item>
            <div className="justify-between">
              <p>
                New user?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
