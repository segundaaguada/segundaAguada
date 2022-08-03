import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {FaFacebookSquare} from "react-icons/fa";
import {FaYoutube, FaHeart} from "react-icons/fa";
import Footer from '../../components/Footer/Footer'
import Div from '../../components/Div/Div'
import Line from '../../components/Line/Line'
import Section from '../../components/Section/Section'
import H3 from '../../components/H3/H3'
import P from '../../components/P/P'
import Nav from '../../components/Nav/Nav'
import Ul from '../../components/Ul/Ul'
import Li from '../../components/Li/Li'
import { COLORS } from '../../Share/Colors';
import { extraRoutes } from '../../Share/utilities';


const MyFooter = ({contactFooter}) => {

  const location = useLocation()

  if (extraRoutes.includes(location.pathname)) return null;

  return (
    <Footer>

      <Div 
        className={'footer-separator'}
        // color del fondo del footer contacto
        contactFooter={contactFooter}
      />

      <Section className='footer-top-section'>
        <Div >
          <H3 className='footer-heading'>Contáctanos</H3>
          <P 
            white="true"
            marginBottom='3%'
          >
            vecinos.segundaaguada@hotmail.com
          </P>
          <P white='true'>956 28 96 25</P>
        </Div>
        <Div >
          <H3 className='footer-heading'>Visita nuestras redes sociales</H3>
          <Div className='footer-icons'>
            <a 
              href="https://es-es.facebook.com/pages/category/Nonprofit-organization/Vecinos-Segunda-Aguada-180116905726288/" 
              target="blank"
              className='footer-a'
            >
              <FaFacebookSquare
                className='footer-facebook'
                style={{ 
                  fill: COLORS.White, 
                  fontSize: 24, 
                  marginRight: 15 
                }}
              />
              <P 
                white='true'
                className='footer-a--p'
              >
                Facebook
              </P>
            </a>
            <a 
              href="https://www.youtube.com/channel/UCy0HRQ63iKEH0wkQU-h27gg" 
              target="blank"
              className='footer-a'
            >
              <FaYoutube
                className='footer-youtube'
                style={{ 
                  fill: COLORS.White, 
                  fontSize: 28,
                  marginRight: 10,
                }}
              />
              <P 
                white='true'
                className='footer-a--p'
              >
                Youtube
              </P>
            </a>
          </Div>
        </Div>
      </Section>

      <Line 
        backgroundColor='white'
        width='80%'
      />

      <Section className='footer-bottom-section'>
        <P 
          white="true"
          className='footer-names'
        >
          Desarrollado con&nbsp;
          <FaHeart style={{ fill: COLORS.HeartRed }}/>
          &nbsp;por&nbsp;<a href='https://www.linkedin.com/in/alberto-bulpe/' target='blank' className='footer-link linkedin'>Alberto Bulpe Martínez</a>&nbsp;y&nbsp;<a href='https://www.linkedin.com/in/beaconde/' target='blank' className='footer-link linkedin'>Beatriz Conde Cerón</a>
        </P>
        <P 
          white="true"
          className='footer-names--responsive'
        >
          Desarrollado por Alberto Bulpe Martínez y Beatriz Conde Cerón
        </P>
        <Nav className='footer-nav'>
          <Ul 
            className='footer-ul'
            nav={true}
          >
            <Li>
              <Link
                to='/404'
                className='footer-link'
              >
                Política de cookies
              </Link>
            </Li>
            <Li>
              <Link
                to='/404'
                className='footer-link'
              >
                Aviso legal
              </Link>
            </Li>
            <Li>
              <Link
                to='/404'
                className='footer-link'
              >
                Política de privacidad
              </Link>
            </Li>
          </Ul>
        </Nav>
      </Section>

    </Footer>
  )
}

export default MyFooter;