// import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
// import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
// import gamestackTexture2 from 'assets/gamestack-list.jpg';
// import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
// import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
// import gamestackTexture from 'assets/gamestack-login.jpg';
// import sliceTextureLarge from 'assets/slice-app-large.jpg';
// import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
// import sliceTexture from 'assets/slice-app.jpg';
// import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
// import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
// import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
// import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Design', 'Code', 'Make'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const profile = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const resume = useRef();

  useEffect(() => {
    const sections = [intro, profile/*, projectOne, projectTwo, projectThree, resume*/];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Engineer + Designer"
        description="Portfolio of Irvin Tancioco — software engineer and UX designer
          in exploring the intersection of software and design with a focus on experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={profile}
        visible={visibleSections.includes(profile.current)}
        id="profile"
      />
      {/* <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Code"
        description=""
        buttonText="View projects"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Design"
        description=""
        buttonText="View projects"
        buttonLink="https://gamestack.hamishw.com"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Make"
        description=""
        buttonText="View projects"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      /> */}
      <Footer />
    </div>
  );
};
