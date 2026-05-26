// copy from @alloy-js/java/src/scope/JavaOutputScope.ts
import { KotlinLexicalScope } from "./KotlinLexicalScope.js";
import { KotlinPackageScope } from "./KotlinPackageScope.js";

export type KotlinOutputScope = KotlinPackageScope | KotlinLexicalScope;
