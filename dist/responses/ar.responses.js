"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
exports.responses = {
    general: {
        created: "تم حفظ البيانات بنجاح",
        updated: "تم تعديل البيانات بنجاح",
        deleted: "نك حذف البيانات بنجاح",
        noDataFound: "لا يوجد بيانات",
        invalidId: "رقم المعرف غير صحيح",
        invalidFile: "ملف غير صالح. يجب أن يكون حجم الملف أقل من 5 ميجابايت ويجب أن يكون من نوع واحد من الأنواع التالية: png ، jpg ، jpeg ، mp4 ، mp3 ، أو ogg.",
        fileUploaded: "تم حفظ الملف بنجاح"
    },
    categories: {
        invalidArTitle: "اسم التصنيف باللغة العربية غير صالح يجب ان يتكون من احرف عربية فقط بين 5 و 255 حرف",
        fieldArRequried: 'حقل اسم التصنيف باللغة العربيه مطلوب',
        invalidEnTitle: "اسم التصنيف باللغة الانجليزية غير صالح يجب ان يتكون من احرف عربية فقط بين 5 و 255 حرف",
        fieldErRequried: 'حقل اسم التصنيف باللغة الانجليزية مطلوب',
        alreadyExsist: "هذا التصنيف موجود بالفعل"
    },
    colors: {
        invalidHexCode: "كود اللون غير صالح",
        invalidName: "اسم اللون غير صالح يجب ان يتكون من حروف فقط بين 5 الي 50 حرف",
        alreadyExsist: "هذا اللون موجود بالفعل"
    },
    users: {
        invalidDeviceId: "معرف الجهاز غير صالح",
        deviceIdRequried: "معرف الجهاز مطلوب",
        invalidGender: "الجنس غير صالح يجب ان يكون اختيار من (MALE - FEMALE)",
        GenderRequried: "الجنس مطلوب",
        invalidCategoryId: "معرف التصنيف غير صحيح",
        CategoryIdRequried: "معرف التصنيف مطلوب",
        invalidAge: "العمر غير صحيح. يجب ان يكون العمر بين 7 و 100 سنه",
        AgeRequried: "العمر مطلوب",
        alreadyExsist: "هذا الحساب موجود بالفعل",
    }
};
//# sourceMappingURL=ar.responses.js.map