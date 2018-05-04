class LinkUtils {
    linkUrl = (link) => link.templated ? link.href.replace(/{\?.+}/g, '') : link.href;

    linkUrlWithProjection = (link, projection) => `${this.linkUrl(link)}?projection=${projection}`;
}

export default new LinkUtils();