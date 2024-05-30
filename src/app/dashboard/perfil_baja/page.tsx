"use client";
import Image from "next/image";
import React, { useState } from 'react';

const Settings = () => {
    const [messageVisible1, setMessageVisible1] = useState(false);
    const [messageVisible2, setMessageVisible2] = useState(false);
    const [messageVisible3, setMessageVisible3] = useState(false);
    const [messageVisible4, setMessageVisible4] = useState(false);

    const handleButtonClick1 = () => {
        setMessageVisible1(true);
        setTimeout(() => setMessageVisible1(false), 6000); 
    };

    const handleButtonClick2 = () => {
        setMessageVisible2(true);
        setTimeout(() => setMessageVisible2(false), 6000); 
    };

    const handleButtonClick3 = () => {
        setMessageVisible3(true);
        setTimeout(() => setMessageVisible3(false), 4000); 
    };

    const handleButtonClick4 = () => {
        setMessageVisible4(true);
        setTimeout(() => setMessageVisible4(false), 4000); 
    };

    return (
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informació Personal
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Nom Sencer
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-3">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-16 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Belén Rodríguez"
                            />

                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Número de telèfon
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-3">
                            <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.62472 2.67197C7.40262 2.67197 8.15037 2.97114 8.71356 3.53433L10.2653 5.08608C10.8847 5.7055 11.0474 6.65792 10.6702 7.42266L9.04804 10.6786C9.00655 10.7641 9.00655 10.8646 9.04804 10.9502C9.37078 11.5998 10.2608 13.0742 11.4646 14.278C12.6684 15.4817 14.1428 16.3717 14.7924 16.6945C14.878 16.736 14.9785 16.736 15.064 16.6945L18.3199 15.0723C19.0846 14.6951 20.0371 14.8578 20.6565 15.4772L22.2083 17.029C22.7714 17.5922 23.0706 18.3399 23.0706 19.1178C23.0706 19.8957 22.7714 20.6434 22.2083 21.2066L21.0598 22.3551C20.1223 23.2926 18.7351 23.6244 17.4298 23.2118C14.7188 22.3674 11.1853 19.8936 8.70718 17.4155C6.22908 14.9374 3.75523 11.4039 2.91082 8.69295C2.49823 7.38772 2.83002 6.00049 3.7675 5.06301L4.91595 3.91455C5.47914 3.35136 6.22689 3.05219 7.00478 3.05219C6.87872 3.05219 6.7517 2.67197 6.62472 2.67197Z"
                                fill=""
                            />
                            </svg>
                        </span>


                      <input
                        className="w-full rounded border border-stroke bg-gray pl-16 px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+34 646 780 233"
                      />
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Adreça electrònica
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-16 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="belenrodriguez.ics@gmail.com"
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Nom d&apos;Usuari
                    </label>
                    <div className="relative">
                        <span className="absolute left-5 top-3">
                            <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path 
                                fillRule="evenodd" 
                                clipRule="evenodd" 
                                d="M3 3V21H21V7.82843L16.1716 3H3ZM5 5H15V9H5V5ZM5 11H19V19H5V11ZM17 13H7V15H17V13Z" 
                                fill="currentColor" 
                            />
                            </svg>
                        </span>
                        <input
                        className="w-full rounded border border-stroke bg-gray pl-16 px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="BelenRodriguezICS"
                        />
                    </div>
                  </div>
                  <br></br>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Perfil
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-16 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Observacions i fets a destacar..."
                      ></textarea>
                    </div>
                  </div>
                  <br></br>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                      onClick={handleButtonClick3}
                    >
                      Guardar
                    </button>
                  </div>
                  <br></br>
                  {messageVisible3 && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Correcte!</strong>
                    <span className="block sm:inline"> La teva informació ja està actualizada.</span>
                  </div>
                    )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  El Teu Rol
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <img src={"/user-rectangle-solid-24.png"} alt="User Icon" className="w-16 h-16" />
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edita la teva foto de perfil 
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Borrar
                        </button>
                        <button className="text-sm hover:text-primary">
                          Actualitzar
                        </button>
                      </span>
                    </div>
                  </div>

                  <div className="relative mb-5.5 block w-full cursor-pointer appearance-none bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
                    <button className="text-sm bg-gray-100 py-2 px-4 rounded-lg shadow-md hover:text-primary transition duration-200 ease-in-out"
                    onClick={handleButtonClick1}
                    >
                        Donar de baixa el meu rol
                    </button>
                  </div>
                  {messageVisible1 && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Gràcies!</strong>
                    <span className="block sm:inline"> El teu rol s&apos;ha donat de baixa correctament. Esperem que hagis gaudit dels nostres serveis!</span>
                  </div>
                    )}

                <br></br>
                  <div className="relative">
                      <span className="absolute left-5 top-3">
                        <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2 12C2 11.4477 2.44772 11 3 11H17.5858L13.2929 6.70711C12.9024 6.31658 12.9024 5.68342 13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071C12.9024 18.3166 12.9024 17.6834 13.2929 17.2929L17.5858 13H3C2.44772 13 2 12.5523 2 12Z"
                                fill=""
                            />
                        </svg>
                      </span>
                      <input
                        className="rounded border border-stroke bg-gray py-3 pl-16 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="rol"
                        name="nouRol"
                        id="rolID"
                        placeholder="EMPRESA_ROL_(XX)"
                      />
                    </div>
                  <div className="relative mb-5.5 block w-full cursor-pointer appearance-none bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
                    <button className="text-sm bg-gray-100 py-2 px-4 rounded-lg shadow-md hover:text-primary transition duration-200 ease-in-out"
                    onClick={handleButtonClick2}
                    >
                        Donar-me d&apos;alta en un rol
                    </button>
                  </div>
                  {messageVisible2 && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Correcte!</strong>
                    <span className="block sm:inline"> Has donat d&apos;alta el teu nou rol. Esperem que gaudeixis dels nostres serveis!</span>
                  </div>
                    )}

                  <br></br>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                      onClick={handleButtonClick4}
                    >
                      Guardar
                    </button>
                  </div>
                  <br></br>
                  {messageVisible4 && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Correcte!</strong>
                    <span className="block sm:inline"> La teva informació ja està actualizada.</span>
                  </div>
                    )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Settings;