import React, {useEffect} from 'react'
import checkLoggedUser from '../../services/checkLoggedUser'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import H2 from '../../components/H2/H2'
import Line from '../../components/Line/Line'
import Div from '../../components/Div/Div'
import P from '../../components/P/P'
import Ul from '../../components/Ul/Ul'
import Ol from '../../components/Ol/Ol'
import Li from '../../components/Li/Li'
import { useDispatch, useSelector } from 'react-redux'
import { setPageVisited, setContactFooter, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const AboutUs = () => {

    const dispatch = useDispatch()

    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)


    useEffect(() => {
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }

        setContactFooter(dispatch, false)

        document.title = 'Nosotros | AVV Segunda Aguada'

        const loggedUser = checkLoggedUser()
        if (!user && loggedUser) {
            const tokenVerified = verifyToken(loggedUser)
            tokenVerified.then(response => {
                if (typeof response === 'string') logout()
                else setUser(dispatch, loggedUser)
            })
        }
        else if (!loggedUser) {
            setUser(dispatch, undefined)
        }

    }, [])

    
    return (
        <Main>
            <Section className='about-us--section'>
                <Div style={{ width: 'fit-content' }}>
                    <H2
                        className='section-heading' 
                        style={{width: '110%'}}
                    >
                        Los orígenes
                    </H2>
                    <Line
                        backgroundColor='yellow'
                        margin='7% 0 10% 0'
                        width='120%'
                    />
                </Div>
                <P className='about-us--p'>Durante el año 2007 y anteriores, literalmente, vivíamos entre camiones, teníamos aceras muy estrechas, las zonas verdes brillaban por su ausencia, al igual que la policía de barrio, pero sobre todo..., vivíamos entre camiones. Por nuestra avenida transitaban mas de 10.000 camiones al mes. Si se hace cuentas se verá claramente la barbaridad que supone para una zona de densidad poblacional excesiva. Soportábamos la polución ambiental del paso de transporte pesado, los ruidos, y aunque resulte increíble el barrio fue escenario de dos muertes por atropello. La indignación fue incrementándose, al comprobar que en nuestra arteria principal, la Avenida Segunda Aguada, la mal llamada "carretera industrial", iba a iniciar el Ayuntamiento, obras pública, sin contar con la opinión de los que aquí vivimos.</P>
                <P className='about-us--p'>La situación estaba pasando de castaño a oscuro, esto no podía seguir así, y aprovechando una manifestación promovida por la Asociación de Comerciantes de la zona, un grupo de vecinos nos echamos a la calle a manifestar nuestra indignación. Y sin conocernos, decidimos constituirnos como asociación de vecinos como la única forma de revindica oficialmente y luchar por el derecho de un barrio digno, al descanso, a la salud y al bienestar.</P>
                <P className='about-us--p'>Prácticamente todos vivíamos en nuestra avenida, por lo que decidimos denominarnos "A.VV. AVENIDA SEGUNDA AGUADA", y el día 7 de Septiembre de 2007 a las 20:00 horas dimos vida a nuestra entidad a través de una asamblea de vecinos de la que surgió nuestra Acta Fundacional. Luego, muchas horas de trabajo, para que la vida de la recién nacida asociación de vecinos se convirtiera en oficial. Labores de gestión, manifestaciones pública, reuniones con representantes del municipio, y nuestra participación en el Pleno del Ayuntamiento el 7 de Diciembre de 2007, para que todos los ciudadanos de Cádiz y nuestros políticos municipales conocieran sin lugar a dudas, que vivimos en una avenida de nuestra ciudad, y no en una "carretera industrial", que vivimos en un barrio con multitud de problemas urbanísticos y medioambientales y que lucharíamos por nuestros derechos como ciudadanos y vecinos de Cádiz, dando por finalizada la época pasada de resignación y conformismo.</P>
                <Div
                    className='about-us--div'
                    style={{width: 'fit-content'}}
                >
                    {/* <Img 
                        src='/images/estacion.jpg' 
                        alt='Estación de tres Segunda Aguada'
                        className='about-us--img'
                    /> */}
                    <video controls className='about-us--img' style={{width: '100%'}}>
                        <source src="/video/video-presentacion.mp4" type="video/mp4" style={{width: '100%;'}}/>
                        Su navegador no soporta contenido multimedia.
                    </video>
                </Div>
            </Section>
            <Section className='about-us--section section-bottom'>
                <Div style={{ width: 'fit-content' }}>
                    <H2
                        className='section-heading' 
                        style={{width: '110%'}}
                    >
                        Fines
                    </H2>
                    <Line
                        backgroundColor='yellow'
                        margin='7% 0 10% 0'
                        width='130%'
                    />
                </Div>
                <P className='about-us--p'>Los fines principales de Asociación de Vecinos Avenida Segunda Aguada son los siguientes:</P>
                <Ol>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Defensa de los intereses generales de los vecinos, en calidad de usuarios y destinatarios finales de la actividad urbanística, cultural, deportiva, educativa, sanitaria, de vivienda, social, económica, de consumo, de participación en asuntos de interés general de la ciudad, etc, fomentando las medidas participativas más adecuadas.</P>
                    </Li>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Informar y apoyar a los vecinos en todas las cuestiones que afecten a sus intereses generales.</P>
                    </Li>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Asumir la representación de los vecinos del ámbito territorial adoptando las resoluciones y llevando a término las actuaciones que por su importancia o interés les afecten individual o colectivamente, o a los intereses generales de la ciudad.</P>
                    </Li>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Fomentar el asociacionismo entre los vecinos del ámbito territorial como instrumento de participación y defensa de los intereses generales de los vecinos.</P>
                    </Li>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Vigilar y exigir que las administraciones públicas, en su respectivo ámbito de competencias, cumplan escrupulosamente con su obligación de promover y facilitar el desarrollo de asociaciones, federaciones, confederaciones y uniones que persigan el interés general.</P>
                    </Li>
                    <Li className='about-us--li'>
                        <P className='about-us--list-p'>Exigir a las administraciones públicas, en su respectivo ámbito de competencias, el cumplimiento de los derechos reconocidos por la Ley Orgánica 1/2002, sus normas de desarrollo y los reglamentos municipales, en orden a:</P>
                        <Ul className='about-us--ul'>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Recibir información directa de los asuntos que son de interés común.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Participar de las subvenciones públicas para el desarrollo de proyectos y actividades.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Establecer convenios de colaboración en programas de interés general.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Ser declaradas de utilidad pública.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Intervenir en todos los ámbitos de las administraciones públicas para defender los intereses generales de los vecinos.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Utilizar los medios públicos &#40;locales, salas de reunión, centros sociales, radios, etc&#41; para el ejercicio de sus funciones de representación y defensa de los intereses de los vecinos.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Ejercitar el derecho a la iniciativa popular.</P>
                            </Li>
                            <Li className='about-us--li'>
                                <P className='about-us--list-p'>Ser escuchada en los Plenos y Comisiones municipales en los asuntos que afecten de modo particular o general (elaboración de disposiciones generales) a los vecinos de su ámbito territorial.</P>
                            </Li>
                        </Ul>
                    </Li>
                </Ol>
            </Section>
        </Main>
    )
}

export default AboutUs