<template>
    <div class = "row" >

        <div class = "col-4" >
            <div class = "row" >
                <div class = "col" >
                    <image class="img-fluid" src = "https://thumb.tildacdn.com/tild3064-6266-4237-a265-303164373230/-/format/webp/k175eye000257.jpg" />
                </div>
            </div>
            <div class = "row" > 
                <div class = "col" >
                    <image class="img-fluid" src = "https://thumb.tildacdn.com/tild3139-3031-4163-a566-656331336366/-/format/webp/sarahsosiak298060.jpg" />
                </div>
            </div>
        </div>

        <div class = "col-8" >
            <image class="img-custom" src = "https://thumb.tildacdn.com/tild3963-3861-4364-b661-303262343363/-/format/webp/scottwebb320624.jpg" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrevueImages',
});
</script>

<style>
    .img-custom{
        height: 100%;
        width: 100%;
        object-fit: none;
    }
    .col, .col-8, .col-4{
        padding-right: 0 !important;
        padding-left: 0 !important;
    }
</style>