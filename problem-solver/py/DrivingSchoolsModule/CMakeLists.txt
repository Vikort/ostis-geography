file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (DrivingSchoolsModule SHARED ${SOURCES})

target_include_directories(DrivingSchoolsModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(DrivingSchoolsModule sc-memory)

add_dependencies(DrivingSchoolsModule sc-memory)

sc_codegen(DrivingSchoolsModule ${CMAKE_CURRENT_LIST_DIR})
