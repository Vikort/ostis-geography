file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (DistrictModule SHARED ${SOURCES})

target_include_directories(DistrictModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(DistrictModule sc-memory)

add_dependencies(DistrictModule sc-memory)

sc_codegen(DistrictModule ${CMAKE_CURRENT_LIST_DIR})
