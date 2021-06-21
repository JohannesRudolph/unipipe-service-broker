import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootBuildImage

plugins {
  kotlin("jvm") version "1.5.0"
  kotlin("plugin.spring") version "1.5.0"

  id("org.springframework.boot") version "2.4.6"
  id("io.spring.dependency-management") version "1.0.11.RELEASE"

  id("org.springframework.experimental.aot") version "0.9.2"

  id("eclipse")
}

group = "io.meshcloud"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
  maven { url = uri("https://repo.spring.io/release") }
  mavenCentral()
}

dependencies {
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.cloud:spring-cloud-starter-open-service-broker:3.3.0")

  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("com.fasterxml.jackson.dataformat:jackson-dataformat-yaml")

  implementation("org.eclipse.jgit:org.eclipse.jgit:5.11.0.202103091610-r")
  implementation("org.eclipse.jgit:org.eclipse.jgit.ssh.jsch:5.11.0.202103091610-r")

  implementation("commons-io:commons-io:2.4")
  implementation("io.github.microutils:kotlin-logging:1.4.9")
  implementation("io.projectreactor.kotlin:reactor-kotlin-extensions:1.0.2.RELEASE")

  testImplementation("org.junit.vintage:junit-vintage-engine")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs = listOf("-Xjsr305=strict")
    jvmTarget = "11"
  }
}

tasks.withType<Test> {
  useJUnit()
}

tasks.withType<BootBuildImage> {
  builder = "paketobuildpacks/builder:tiny"
  // apply some tunings so we can run the image within 384M of memory
  environment = mapOf(
      "BP_NATIVE_IMAGE" to "true", // enable native image AOT

      "BPL_SPRING_CLOUD_BINDINGS_ENABLED" to "false", // not needed

      // note: we use the https://github.com/paketo-buildpacks/environment-variables buildpack
      // to fixate some environment variables in the docker image. There may be a better approach
      // that still allows consumers of the image to override the settings themselves, but this works for now
      // see also https://stackoverflow.com/a/66909132/125407

      "BPE_OVERRIDE_JAVA_TOOL_OPTIONS" to "-XX:ReservedCodeCacheSize=120M",

      // reduce number of threads so we reserve less memory and can run in smaller containers
      // we need little concurrency, so this number of threads should be more than sufficient
      // "BPL_JVM_THREAD_COUNT" to "25" -> does not work
      "BPE_OVERRIDE_BPL_JVM_THREAD_COUNT" to "25"
  )
}
