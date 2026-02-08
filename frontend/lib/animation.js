import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Text reveal animation (like WelcomeSection)
export const textRevealAnimation = (element, options = {}) => {
  const {
    direction = 'up',
    delay = 0,
    duration = 1,
    ease = 'power2.out',
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse'
  } = options;

  const initialPosition = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  const finalPosition = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 }
  };

  return gsap.fromTo(element,
    initialPosition[direction],
    {
      ...finalPosition[direction],
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions
      }
    }
  );
};

// Stagger text reveal for multiple elements
export const staggerTextReveal = (elements, options = {}) => {
  const {
    direction = 'up',
    stagger = 0.1,
    delay = 0,
    duration = 1,
    ease = 'power2.out',
    trigger = elements[0],
    start = 'top 80%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse'
  } = options;

  const initialPosition = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  const finalPosition = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 }
  };

  return gsap.fromTo(elements,
    initialPosition[direction],
    {
      ...finalPosition[direction],
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions
      }
    }
  );
};

// Fade in animation
export const fadeInAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    ease = 'power2.out',
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse'
  } = options;

  return gsap.fromTo(element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions
      }
    }
  );
};

// Scale animation
export const scaleAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    ease = 'power2.out',
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse'
  } = options;

  return gsap.fromTo(element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions
      }
    }
  );
};

// Slide in from sides
export const slideInAnimation = (element, options = {}) => {
  const {
    direction = 'left',
    delay = 0,
    duration = 1,
    ease = 'power2.out',
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse'
  } = options;

  const initialPosition = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 }
  };

  const finalPosition = {
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 }
  };

  return gsap.fromTo(element,
    initialPosition[direction],
    {
      ...finalPosition[direction],
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions
      }
    }
  );
};

// Parallax effect
export const parallaxAnimation = (element, options = {}) => {
  const {
    speed = 0.5,
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true
  } = options;

  return gsap.to(element, {
    y: (i, target) => -target.offsetHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub
    }
  });
};

// Floating animation
export const floatingAnimation = (element, options = {}) => {
  const {
    distance = 10,
    duration = 2,
    ease = 'power2.inOut'
  } = options;

  return gsap.to(element, {
    y: -distance,
    duration,
    ease,
    yoyo: true,
    repeat: -1
  });
};

// HERO SECTION SPECIFIC ANIMATIONS (separated from HeroSection)

// Background zoom effect
export const backgroundZoomAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 1.5,
    ease = 'power2.out',
    initialScale = 1.1,
    finalScale = 1,
    initialOpacity = 0.8,
    finalOpacity = 1
  } = options;

  return gsap.fromTo(element,
    { scale: initialScale, opacity: initialOpacity },
    {
      scale: finalScale,
      opacity: finalOpacity,
      duration,
      delay,
      ease
    }
  );
};

// Headline slide up animation
export const headlineSlideUpAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    ease = 'power3.out',
    yOffset = 100
  } = options;

  return gsap.fromTo(element,
    { y: yOffset, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease
    }
  );
};

// Subtext slide from right animation
export const subtextSlideRightAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    ease = 'power2.out',
    xOffset = 60
  } = options;

  return gsap.fromTo(element,
    { x: xOffset, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease
    }
  );
};

// Button slide from left with scale animation
export const buttonSlideLeftWithScaleAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.7,
    ease = 'power2.out',
    xOffset = -100,
    initialScale = 0.8
  } = options;

  return gsap.fromTo(element,
    { x: xOffset, opacity: 0, scale: initialScale },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease
    }
  );
};

// Blog card slide up with scale animation
export const blogCardSlideUpWithScaleAnimation = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    ease = 'power2.out',
    yOffset = 60,
    initialScale = 0.9
  } = options;

  return gsap.fromTo(element,
    { y: yOffset, opacity: 0, scale: initialScale },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease
    }
  );
};

// Blog card floating animation
export const blogCardFloatingAnimation = (element, options = {}) => {
  const {
    delay = 1,
    duration = 2.5,
    ease = 'power2.inOut',
    yOffset = -8
  } = options;

  return gsap.to(element, {
    y: yOffset,
    duration,
    ease,
    yoyo: true,
    repeat: -1,
    delay
  });
};

// Complete Hero Section Timeline Animation
export const heroSectionTimelineAnimation = (elements, options = {}) => {
  const {
    backgroundElement,
    headlineElement,
    subtextElement,
    buttonElement,
    blogCardElement,
    delay = 0
  } = options;

  const tl = gsap.timeline({ delay });

  // Background zoom effect
  if (backgroundElement) {
    tl.fromTo(backgroundElement,
      { scale: 1.1, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }

  // Headline animation
  if (headlineElement) {
    tl.fromTo(headlineElement,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    );
  }

  // Subtext animation
  if (subtextElement) {
    tl.fromTo(subtextElement,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );
  }

  // Button animation
  if (buttonElement) {
    tl.fromTo(buttonElement,
      { x: -100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );
  }

  // Blog card animation
  if (blogCardElement) {
    tl.fromTo(blogCardElement,
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }

  return tl;
};

// Custom hook for easy use in components
export const useGSAPAnimation = () => {
  const animateText = (ref, options = {}) => {
    if (ref.current) {
      textRevealAnimation(ref.current, options);
    }
  };

  const animateStagger = (refs, options = {}) => {
    const elements = refs.map(ref => ref.current).filter(Boolean);
    if (elements.length > 0) {
      staggerTextReveal(elements, options);
    }
  };

  const animateFadeIn = (ref, options = {}) => {
    if (ref.current) {
      fadeInAnimation(ref.current, options);
    }
  };

  const animateScale = (ref, options = {}) => {
    if (ref.current) {
      scaleAnimation(ref.current, options);
    }
  };

  const animateSlideIn = (ref, options = {}) => {
    if (ref.current) {
      slideInAnimation(ref.current, options);
    }
  };

  const animateParallax = (ref, options = {}) => {
    if (ref.current) {
      parallaxAnimation(ref.current, options);
    }
  };

  const animateFloating = (ref, options = {}) => {
    if (ref.current) {
      floatingAnimation(ref.current, options);
    }
  };

  // Hero section specific animations
  const animateBackgroundZoom = (ref, options = {}) => {
    if (ref.current) {
      backgroundZoomAnimation(ref.current, options);
    }
  };

  const animateHeadlineSlideUp = (ref, options = {}) => {
    if (ref.current) {
      headlineSlideUpAnimation(ref.current, options);
    }
  };

  const animateSubtextSlideRight = (ref, options = {}) => {
    if (ref.current) {
      subtextSlideRightAnimation(ref.current, options);
    }
  };

  const animateButtonSlideLeftWithScale = (ref, options = {}) => {
    if (ref.current) {
      buttonSlideLeftWithScaleAnimation(ref.current, options);
    }
  };

  const animateBlogCardSlideUpWithScale = (ref, options = {}) => {
    if (ref.current) {
      blogCardSlideUpWithScaleAnimation(ref.current, options);
    }
  };

  const animateBlogCardFloating = (ref, options = {}) => {
    if (ref.current) {
      blogCardFloatingAnimation(ref.current, options);
    }
  };

  const animateHeroSectionTimeline = (elements, options = {}) => {
    const elementRefs = {};
    Object.keys(elements).forEach(key => {
      if (elements[key]?.current) {
        elementRefs[key] = elements[key].current;
      }
    });
    return heroSectionTimelineAnimation(elementRefs, options);
  };

  return {
    animateText,
    animateStagger,
    animateFadeIn,
    animateScale,
    animateSlideIn,
    animateParallax,
    animateFloating,
    // Hero section specific animations
    animateBackgroundZoom,
    animateHeadlineSlideUp,
    animateSubtextSlideRight,
    animateButtonSlideLeftWithScale,
    animateBlogCardSlideUpWithScale,
    animateBlogCardFloating,
    animateHeroSectionTimeline
  };
};