SET(CMAKE_BUILD_TYPE Debug)
file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (PoliceTranslatorModule SHARED ${SOURCES})

target_include_directories(PoliceTranslatorModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(PoliceTranslatorModule sc-memory)

add_dependencies(PoliceTranslatorModule sc-memory)

sc_codegen(PoliceTranslatorModule ${CMAKE_CURRENT_LIST_DIR})