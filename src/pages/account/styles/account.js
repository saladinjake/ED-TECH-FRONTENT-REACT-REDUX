import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
  form.form {
    ul.topics {
      padding-top: 10px;

      li {
        display: flex;
        padding: 0;
        width: 100%;

        span {
          font-size: 13px;
          color: #555555;
          text-transform: capitalize;
          font-weight: 400;
          border-bottom: 1px solid #eeeeee;
        }

        button {
          background-color: red;
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }

  .login-page {
    .login-area {
      padding: 70px 0;

      .login-box {
        max-width: 500px;
        background: #fafafa;
        margin: auto;
        margin-top: -60px;
        // border: 1px solid ${colors.border1};
        // box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
        padding: 25px 30px 35px;
        // border-radius: 5px;
        height: 490px;
        .login-title {
          h3 {
            color: ${colors.black2};
            text-transform: uppercase;
            font-weight: 600;
            padding-bottom: 10px;
            margin-bottom: 20px;
            position: relative;
            // &:before {
            //   position: absolute;
            //   content: "";
            //   background: #205fdd;
            //   width: 50px;
            //   height: 2px;
            //   bottom: 0;
            //   left: 50%;
            //   margin-left: -25px;
            // }

            @media (max-width: 575px) {
              font-size: 20px;
            }
          }
        }

        form.form {
          p.form-control {
            padding: 0;
            width: auto;
            height: auto;
            background: #fafafa;
            border: none;
            margin-bottom: 28px;
            position: relative;
            display: flex;
            flex-direction: column;

            label {
              font-size: 15px;
              color: ${colors.text1};
              font-weight: 500;
              text-align: left;

              i {
                font-size: 10px;
                color: ${colors.text3};
              }

              @media (max-width: 575px) {
                font-size: 14px;
              }
            }

            input {
              width: 100%;
              height: 48px;
              background-color: #fafafafff;
              font-size: 14px;
              padding: 15px 20px;
              color: ${colors.black1};
              border: 1px solid ${colors.border3};
              border-radius: 5px;

              &::placeholder {
                font-size: 14px;
                font-style: italic;
                color: ${colors.text3};

                @media (max-width: 575px) {
                  font-size: 13px;
                }
              }

              &:focus {
                border-color: ${colors.green};
              }

              @media (max-width: 575px) {
                height: 40px;
              }
            }

            span {
              color: ${colors.red};
              font-weight: 300;
              position: absolute;
              bottom: -20px;
              left: 0;
              visibility: visible;
            }
          }

          p.form-control.success {
            input {
              border: 2px solid ${colors.green};
            }

            &::before {
              position: absolute;
              content: "\f058";
              font-family: "Line Awesome Free";
              font-size: 24px;
              color: ${colors.green};
              font-weight: 900;
              top: 34px;
              right: 10px;
            }
          }

          p.form-control.error {
            input {
              border: 2px solid ${colors.red};
            }

            &::before {
              position: absolute;
              content: "\f06a";
              font-family: "Line Awesome Free";
              font-size: 24px;
              color: ${colors.red};
              font-weight: 900;
              top: 34px;
              right: 10px;
            }
          }

          p.form-control.error {
            span {
              visibility: visible;
            }
          }

          button {
            font-size: 16px;
            color: #fafafa;
            background: ${colors.gr_bg2};
            width: 100%;
            height: 48px;
            font-weight: 500;
            border: none;
            border-radius: 5px;
            text-transform: uppercase;
            margin-bottom: 20px;

            &:hover {
              background: ${colors.gr_bg2};

              i {
                color: #fafafafff;
              }
            }

            @media (max-width: 575px) {
              font-size: 15px;
              height: 40px;
            }
          }

          .save-forget-password {
            margin-bottom: 15px;
            .save-passowrd {
              label {
                font-size: 14px;
                color: ${colors.text3};
                display: block;
                font-weight: 500;
                margin-bottom: 0;
                cursor: pointer;

                input[type="checkbox"] {
                  border: 2px solid ${colors.border3};
                  appearance: none;
                  width: 18px;
                  height: 18px;
                  cursor: pointer;
                  margin-right: 6px;
                  position: relative;
                  top: 4px;

                  &:focus {
                    outline: none;
                  }

                  &:checked {
                    background-color: ${colors.green};
                    background: ${colors.green}
                      url("data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==")
                      2px 2px no-repeat;
                    border-color: ${colors.green};
                  }
                }
              }
            }
            .forget-password {
              margin-top: 3px;
              a {
                font-size: 14px;
                color: ${colors.green};
                font-weight: 500;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }

          .not_account-btn {
            border-bottom: 1px solid ${colors.border1};
            margin-bottom: 20px;
            padding-bottom: 20px;
            p {
              font-size: 14px;
              color: ${colors.text3};
              a {
                font-size: 14px;
                color: ${colors.green};
                font-weight: 500;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }

          .social-login {
            p {
              font-size: 14px;
              color: ${colors.text3};
              margin-bottom: 15px;
            }
            ul {
              li {
                a {
                  font-size: 14px;
                  color: #fafafafff;
                  display: inline-block;
                  width: 110px;
                  height: 40px;
                  border-radius: 30px;
                  padding-top: 10px;
                  i {
                    margin-right: 3px;
                  }
                  &:hover {
                    background: ${colors.green} !important;
                  }
                }
                &:nth-child(1) {
                  a {
                    background: #db4437;
                  }
                }
                &:nth-child(2) {
                  a {
                    background: #4267b2;
                  }
                }
                &:nth-child(3) {
                  a {
                    background: #1da1f2;
                  }
                }
              }
            }
          }
        }
      }

      @media (max-width: 767px) {
        padding: 30px 0;
      }
    }
  }

  .registration-page {
    .registration-area {
      padding: 70px 0;
      .registration-box {
        background: #fafafa;
        max-width: 100%;
        margin: auto;
        // border: 1px solid ${colors.border1};
        // box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
        // padding: 25px 30px;
        // border-radius: 5px;

        &.instructorregister {
          max-width: 100%;
          .row {
            margin: 0;
            justify-content: space-between;
          }
        }
        .registration-title {
          h3 {
            color: ${colors.black2};
            text-transform: uppercase;
            font-weight: 600;
            padding-bottom: 10px;
            margin-bottom: 20px;
            position: relative;
            &:before {
              position: absolute;
              content: "";
              background: ${colors.gr_bg2};
              width: 50px;
              height: 2px;
              bottom: 0;
              left: 50%;
              margin-left: -25px;
            }

            @media (max-width: 575px) {
              font-size: 20px;
            }
          }
        }

        form.form {
          p.form-control {
            padding: 0;
            width: auto;
            height: auto;
            background: #fafafa;
            border: none;
            margin-bottom: 28px;
            position: relative;
            display: flex;
            flex-direction: column;

            label {
              font-size: 15px;
              color: ${colors.text1};
              font-weight: 500;
              text-align: left;

              i {
                font-size: 10px;
                color: ${colors.text3};
              }

              @media (max-width: 575px) {
                font-size: 14px;
              }
            }

            input,
            textarea {
              width: 100%;
              height: 48px;
              background-color: #fafafafff;
              font-size: 14px;
              padding: 15px 20px;
              color: ${colors.black1};
              border: 1px solid ${colors.border3};
              border-radius: 5px;

              &::placeholder {
                font-size: 14px;
                font-style: italic;
                color: ${colors.text3};

                @media (max-width: 575px) {
                  font-size: 13px;
                }
              }

              &:focus {
                border-color: ${colors.green};
              }

              @media (max-width: 575px) {
                height: 40px;
              }
            }

            select {
              background: #fafafa;
              border: none;
              border: 1px solid ${colors.border3};
              outline: none;
              cursor: pointer;
              width: 100%;
              padding: 10px;
              width: 100%;
              height: auto;
              display: inline-block;

              &:-moz-focusring {
                color: #fafafa;
                text-shadow: 0 0 0 #000;
              }

              &:-webkit-focusring {
                color: #fafafa;
                text-shadow: 0 0 0 #000;
              }

              option {
                padding: 1rem;
                background-color: #fafafa;
                cursor: pointer;
              }
            }

            span {
              color: ${colors.red};
              font-weight: 300;
              position: absolute;
              bottom: -20px;
              left: 0;
              visibility: visible;
            }
          }

          p.form-control.success {
            input {
              border: 2px solid ${colors.green};
            }

            &::before {
              position: absolute;
              content: "\f058";
              font-family: "Line Awesome Free";
              font-size: 24px;
              color: ${colors.green};
              font-weight: 900;
              top: 34px;
              right: 10px;
            }
          }

          p.form-control.error {
            input {
              border: 2px solid ${colors.red};
            }

            &::before {
              position: absolute;
              content: "\f06a";
              font-family: "Line Awesome Free";
              font-size: 24px;
              color: ${colors.red};
              font-weight: 900;
              top: 34px;
              right: 10px;
            }
          }

          p.form-control.error {
            span {
              visibility: visible;
            }
          }

          button {
            font-size: 16px;
            color: #fafafa;
            background: ${colors.gr_bg2};
            width: 100%;
            height: 48px;
            font-weight: 500;
            border: none;
            border-radius: 5px;
            text-transform: uppercase;
            margin-bottom: 20px;

            &:hover {
              background: ${colors.gr_bg2};

              i {
                color: #fafafafff;
              }
            }

            @media (max-width: 575px) {
              font-size: 15px;
              height: 40px;
            }
          }
        }

        .have_account-btn {
          p {
            font-size: 14px;
            color: ${colors.text3};
            a {
              font-size: 14px;
              color: ${colors.green};
              font-weight: 500;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }

      @media (max-width: 767px) {
        padding: 30px 0;
      }
    }
  }
`;