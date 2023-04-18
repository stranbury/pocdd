import supabase from './client';

export const uploadFile = async (file) => {
    const { data, error } = await supabase.storage
        .from("files")
        .upload(file.name, file, {
            cacheControl: "3600",
            upsert: false,
        });
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}

export const deleteUploadedFile = async (name) => {
    const { data, error } = await supabase.storage
        .from("files")
        .remove([name]);
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}
export const getUploadedFile = async (name) => {
    const { data, error } = await supabase.storage
        .from("files")
        .download(name);
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}

export const getUploadedFiles = async () => {
    const { data, error } = await supabase.storage
        .from("files")
        .list();
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}

export const getUploadedFileUrl = async (name) => {
    const { data, error } = await supabase.storage
        .from("files")
        .getPublicUrl(name);
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}

export const getUploadedFileUrlWithExpiry = async (name, expiry) => {
    const { data, error } = await supabase.storage
        .from("files")
        .getPublicUrl(name, expiry);
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}

export const getUploadedFileUrlWithExpiryAndMetadata = async (name, expiry, metadata) => {
    const { data, error } = await supabase.storage
        .from("files")
        .getPublicUrl(name, expiry, metadata);
    if (error) {
        console.log("error", error);
        return [];
    }
    return data;
}



