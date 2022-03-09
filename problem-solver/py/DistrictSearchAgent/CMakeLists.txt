file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (DistrictSearchModule SHARED ${SOURCES})

target_include_directories(DistrictSearchModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(DistrictSearchModule sc-memory)

add_dependencies(DistrictSearchModule sc-memory)

sc_codegen(DistrictSearchModule ${CMAKE_CURRENT_LIST_DIR})
