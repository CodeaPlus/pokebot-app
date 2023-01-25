import { CSSProperties, FC, ReactNode, useCallback, useEffect, useRef } from "react";
import { useAnimation, motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface VariantsProps {
  duration?: number,
  delay?: number
}

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn'

interface Props {
  animation: AnimationType,
  children?: ReactNode,
  tag?: string,
  className?: string,
  style?: CSSProperties,
  duration?: number,
  delay?: number
}

const MotionContainer: FC<Props> = ({ children, animation = 'fadeUp', tag = 'div', className, style, duration = 0.5, delay = 1 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  const variantFadeUp = ({ duration, delay }: VariantsProps) => {
    return {
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
      hidden: { opacity: 0, y: 100 }
    }
  }

  const variantFadeDown = ({ duration, delay }: VariantsProps) => {
    return {
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
      hidden: { opacity: 0, y: -100 }
    }
  }

  const variantFromLeft = ({ duration, delay }: VariantsProps) => {
    return {
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
      hidden: { opacity: 0, x: -100 }
    }
  }

  const variantFromRight = ({ duration, delay }: VariantsProps) => {
    return {
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
      hidden: { opacity: 0, x: 100 }
    }
  }

  const variantFadeIn = ({ duration, delay }: VariantsProps) => {
    return {
      visible: { opacity: 1, transition: { duration, delay } },
      hidden: { opacity: 0 }
    }
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    if (!inView && scrollYProgress.get() === 0) {
      controls.start("hidden");
    }
  }, [controls, inView, scrollYProgress]);

  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  const chooseAnimation = (animation: AnimationType, duration: number, delay: number) => {
    switch (animation) {
      case 'fadeUp':
        return variantFadeUp({ duration, delay })
      case 'fadeDown':
        return variantFadeDown({ duration, delay })
      case 'fadeLeft':
        return variantFromRight({ duration, delay })
      case 'fadeRight':
        return variantFromLeft({ duration, delay })
      case 'fadeIn':
        return variantFadeIn({ duration, delay })
    }
  }

  return (
    <>
      {tag === 'div' && (<motion.div ref={setRefs} style={style} animate={controls} initial="hidden" variants={chooseAnimation(animation, duration, delay)} className={className}>{children}</motion.div>)}
      {tag === 'h1' && (<motion.h1 ref={setRefs} style={style} animate={controls} initial="hidden" variants={chooseAnimation(animation, duration, delay)} className={className}>{children}</motion.h1>)}
      {tag === 'h2' && (<motion.h2 ref={setRefs} style={style} animate={controls} initial="hidden" variants={chooseAnimation(animation, duration, delay)} className={className}>{children}</motion.h2>)}
      {tag === 'p' && (<motion.p ref={setRefs} style={style} animate={controls} initial="hidden" variants={chooseAnimation(animation, duration, delay)} className={className}>{children}</motion.p>)}
      {tag === 'span' && (<motion.span ref={setRefs} style={style} animate={controls} initial="hidden" variants={chooseAnimation(animation, duration, delay)} className={className}>{children}</motion.span>)}
    </>
  );
}

export default MotionContainer;