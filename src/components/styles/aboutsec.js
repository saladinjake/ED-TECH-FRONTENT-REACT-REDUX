import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`

    .mainsect {
        background: #fff;
        padding   : 100px 0px;
        text-align:center;

        .oneup {
            padding:200px 0px 0px;
            text-align:left;

            h3 {
                font-weight: 500;
            }

            p {
                font-style: normal;
                font-weight: normal;
                font-weight: 300;
                font-size: 1.5rem;
                line-height: 2rem;
                color: #30415a;
                padding-top: 2.5rem;
                padding-bottom: 2.5rem;
                width: 90%;
            }

            .icon-img {
                width:30px;
            }
        }

        .twoup {
            padding:0px 0px;
            text-align:left;

            h3 {
                font-weight: 500;
            }

            p {
                font-style: normal;
                font-weight: normal;
                font-weight: 300;
                font-size: 1.5rem;
                line-height: 2rem;
                color: #30415a;
                padding-top: 2.5rem;
                padding-bottom: 2.5rem;
                width: 90%;
            }

            .icon-img {
                width:30px;
            }
        }
        
        .features__item {
            h3 {
                font-style: normal;
                font-weight: bold;
                font-weight: 500;
                font-size: 2rem;
                line-height: 2.5 rem;
                color: #30415a;
                padding-top: 2rem;
                padding-bottom: 2rem;
                width: 90%;
            }

            h2 {
                font-weight: normal;
                color: #30415a;
                padding-bottom: 5rem;
                font-size: 2rem;
                line-height: 3.5rem;
            }
        }

        .features__box {

            h3 {
                font-style: normal;
                font-weight: normal;
                font-weight: 500;
                font-size: 1.5rem;
                line-height: 2rem;
                color: #30415a;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }

            p {
              font-style: normal;
              font-weight: normal;
              font-weight: 500;
              font-size: 1.5rem;
              line-height: 2rem;
              color: #30415a;
              padding-top: 1rem;
              padding-bottom: 1rem;
              width: 90%;
        
              @include respond(phone) {
                width: 100%;
                font-size: 1.2rem;
                line-height: 1.5rem;
                text-align: center;
              }
            }
        }
    }

    
`;