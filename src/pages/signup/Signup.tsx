import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const base64Encode = (data: any) => {
    return btoa(JSON.stringify(data));
  };

  useEffect(() => {
    const base64Decode = (base64String: string) => {
      return JSON.parse(atob(base64String));
    };
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
    const existingData = localStorage.getItem("user-info");
    const dataArray = existingData ? JSON.parse(atob(existingData)) : [];
    console.log("e", e);
    const data = {
      name: e.name,
      username: e.username,
      password: e.password,
      isLoggedIn : false
    };
    dataArray.push(data);
    localStorage.setItem("user-info", base64Encode(dataArray));
    navigate("/Login");
  };

  return (
    // <div className="flex">
    //   <div className="w-1/2 h-screen flex items-center justify-center">
    //     <img
    //       className="max-w-full h-screen"
    //       src="https://www.groupeparima.com/wp-content/uploads/2021/06/newsletter.jpg"
    //       alt="Placeholder"
    //     />
    //   </div>

    //   <div className="w-1/2 h-screen flex items-center justify-center">
    //   <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 p-8 rounded-lg">
    //   <div className="flex items-center justify-center mb-6">
    //       <img className="h-20" src="./img/logo.png.png" alt="Logo" />
    //     </div>
    //   <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
    //       <Controller
    //         control={control}
    //         rules={{
    //           required: 'name is required',
    //         }}
    //         name="name"
    //         render={({ field: { onChange, value , name} }) => {
    //           return (
    //             <>
    //             <Input
    //               placeholder="Full name"
    //               onChange={(e) => {
    //                 onChange(e);
    //               }}
    //               value={value}
    //               />
    //             {errors[name] ? <p className="text-red-600 text-sm"> {errors['name']?.message}</p> : ""}
    //               </>
    //           );
    //         }}
    //       />

    //     <Controller
    //       control={control}
    //       rules={{
    //         required: 'username is required',
    //       }}
    //       name="username"
    //       render={({ field: { onChange, value } }) => {
    //         return (
    //           <>
    //           <Input
    //           placeholder="Enter your username"
    //           onChange={(e) => {
    //             onChange(e);
    //             }}
    //             value={value}
    //             className="mt-3"
    //           />
    //           {errors['username'] ? <p className="text-red-600 text-sm"> {errors['username']?.message}</p> : ""}
    //         </>
    //         );
    //       }}
    //     />

    //     <Controller
    //       control={control}
    //       rules={{
    //         required: 'password is required',

    //       }}
    //       name="password"
    //       render={({ field: { onChange, value } }) => {
    //         return (
    //           <>
    //           <Input.Password
    //             placeholder="Enter your password"
    //             onChange={(e) => {
    //               onChange(e);
    //             }}
    //             value={value}
    //             className="mt-3"
    //           />
    //           {errors['password'] ? <p className="text-red-600 text-sm"> {errors['password']?.message}</p> : ""}
    //           </>
    //         );
    //       }}
    //     />

    //     <Form.Item className="pt-6">
    //       <Button type="primary" htmlType="submit" className="p-3 w-full">
    //         Submit
    //       </Button>
    //     </Form.Item>
    //   </form>
    //   </div>
    // </div>
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
              rules={{ required: "Name is required" }}
              name="name"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    placeholder="Full name"
                    onChange={onChange}
                    value={value}
                    className="p-2"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: "Username is required" }}
              name="username"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    placeholder="Enter your username"
                    onChange={onChange}
                    value={value}
                    className="p-2 mt-3"
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: "Password is required" }}
              name="password"
              render={({ field: { onChange, value } }) => ( 
                <>
                  <Input.Password
                    placeholder="Enter your password"
                    onChange={onChange}
                    value={value}
                    className="p-2 mt-3"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </>
              )}
            />

            <Form.Item className="pt-6">
              <Button type="primary" htmlType="submit" className="w-full p-3">
                Submit
              </Button>
            </Form.Item>
            <p>
              Already user?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
