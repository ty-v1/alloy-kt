import {
  Children,
  ComponentContext,
  createContext,
  Scope,
  SourceDirectory,
  SourceDirectoryContext,
  useContext,
  useScope,
} from "@alloy-js/core";
import { KotlinPackageScope } from "../scope/KotlinPackageScope.js";

export interface KotlinPackageDirectoryContext {
  scope: KotlinPackageScope;
  path: string;
  name: string;
  qualifiedName: string;
}

export const KotlinPackageDirectoryContext: ComponentContext<KotlinPackageDirectoryContext> = createContext();

export function usePackage() {
  return useContext(KotlinPackageDirectoryContext);
}

export interface PackageDirectoryProps {
  package: string;
  children?: Children;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const sourceDirectory = useContext(SourceDirectoryContext);
  const parentPackage = usePackage();

  const packageNames = props.package.split(".");
  const packageName = packageNames[0];

  const fullyQualifiedPackageName = parentPackage ? parentPackage.qualifiedName + "." + packageName : packageName;

  const parentScope = useScope();
  const scope = new KotlinPackageScope(fullyQualifiedPackageName, parentScope);

  const packagePath = (sourceDirectory?.path ?? "") + "/" + packageName;
  const packageContext: KotlinPackageDirectoryContext = {
    scope,
    path: packagePath,
    name: packageName,
    qualifiedName: fullyQualifiedPackageName,
  };

  function ChildPackageDirectory() {
    if (packageNames.length > 1) {
      return <PackageDirectory package={packageNames.slice(1).join(".")}>{props.children}</PackageDirectory>;
    } else {
      return props.children;
    }
  }

  return (
    <KotlinPackageDirectoryContext.Provider value={packageContext}>
      <Scope value={scope}>
        <SourceDirectory path={packageName}>
          <ChildPackageDirectory />
        </SourceDirectory>
      </Scope>
    </KotlinPackageDirectoryContext.Provider>
  );
}
