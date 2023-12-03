<template>
    <div :id="galleryID">
        <div class="photo-gallery-wrapper grid grid-cols-3 gap-2">
            <a v-for="(image, key) in imagesData" :class="image.span" :key="key" :href="image.largeURL" :data-pswp-width="image.width"
                :data-pswp-height="image.height" target="_blank" rel="noreferrer">
                    <img :src="image.thumbnailURL" class="rounded w-full" alt="" />
            </a>
        </div>
    </div>
</template>


<script lang="ts" >
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


export default {
    name: 'SimpleGallery',
    props: {
        galleryID: String,
        images: Array<{ largeURL: string, width: string, height: string, thumbnailURL: string, span: string }>,
    },
    setup(props) {
        return {
            imagesData: props.images,
            lightbox: '' as any
        };
    },
    mounted() {
        if (!this.lightbox) {
            this.lightbox = new PhotoSwipeLightbox({
                gallery: '#' + this.$props.galleryID,
                children: 'a',
                pswpModule: () => import('photoswipe'),
            });
            this.lightbox.init();
        }
    },
    unmounted() {
        if (this.lightbox) {
            this.lightbox.destroy();
            this.lightbox = null;
        }
    },
    methods: {},
    watch: {
        images(newImages) {
            this.imagesData = newImages
        }
    }
}; 
</script>