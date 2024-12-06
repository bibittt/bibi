const { createApp } = Vue

createApp({
    data() {
        return {
            mediaItems: [],
            cloudName: '你的_CLOUD_NAME', // 替换为你的 Cloudinary cloud name
            uploadPreset: '你的_UPLOAD_PRESET' // 替换为你的 upload preset
        }
    },
    methods: {
        openUploadWidget() {
            const uploadWidget = cloudinary.createUploadWidget(
                {
                    cloudName: this.cloudName,
                    uploadPreset: this.uploadPreset,
                    sources: ['local', 'url', 'camera'],
                    multiple: true,
                    maxFiles: 10,
                    maxFileSize: 15000000,
                    resourceType: ['image', 'video'],
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        this.mediaItems.push({
                            id: result.info.public_id,
                            url: result.info.secure_url,
                            title: result.info.original_filename,
                            resource_type: result.info.resource_type,
                            format: result.info.format
                        });
                    }
                }
            );
            uploadWidget.open();
        }
    },
    mounted() {
        // 这里可以添加从 localStorage 或其他存储加载已上传文件的逻辑
    }
}).mount('#app') 