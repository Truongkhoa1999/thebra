export const smoothScroll = (sectionId: string, shouldScroll: boolean) => {
    if (!shouldScroll) {
        return;
    }
    const targetSection = document.getElementById(sectionId)
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' })
    } else if (window.location.hash === '#posts') {
        targetSection!.scrollIntoView({ behavior: 'smooth' })

    }

}