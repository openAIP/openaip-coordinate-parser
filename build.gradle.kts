plugins {
    kotlin("jvm") version "1.9.0"
}

repositories {
    mavenCentral()
}

kotlin {
    jvmToolchain(8)
}

dependencies {
    testImplementation(kotlin("test"))
}
