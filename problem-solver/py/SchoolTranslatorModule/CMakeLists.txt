SET(CMAKE_BUILD_TYPE Debug)
file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SchoolTranslatorModule SHARED ${SOURCES})

target_include_directories(SchoolTranslatorModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SchoolTranslatorModule sc-memory)

add_dependencies(SchoolTranslatorModule sc-memory)

sc_codegen(SchoolTranslatorModule ${CMAKE_CURRENT_LIST_DIR})