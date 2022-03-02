file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByAreaModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByAreaModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByAreaModule sc-memory)

add_dependencies(SearchEstatesByAreaModule sc-memory)

sc_codegen(SearchEstatesByAreaModule ${CMAKE_CURRENT_LIST_DIR})
